package com.emotionoui.oui.diary.service;

import com.emotionoui.oui.alarm.service.AlarmService;
import com.emotionoui.oui.calendar.entity.Emotion;
import com.emotionoui.oui.calendar.repository.EmotionRepository;
import com.emotionoui.oui.diary.dto.EmotionClass;
import com.emotionoui.oui.diary.dto.RecommendMusicClass;
import com.emotionoui.oui.diary.dto.req.CreateDailyDiaryReq;
import com.emotionoui.oui.diary.dto.req.DecorateDailyDiaryReq;
import com.emotionoui.oui.diary.dto.req.RecommendMusicReq;
import com.emotionoui.oui.diary.dto.req.UpdateDiarySettingReq;
import com.emotionoui.oui.diary.dto.res.DecorateDailyDiaryRes;
import com.emotionoui.oui.diary.dto.res.SearchDailyDiaryRes;
import com.emotionoui.oui.diary.dto.res.SearchDiarySettingRes;
import com.emotionoui.oui.diary.entity.DailyDiary;
import com.emotionoui.oui.diary.entity.DailyDiaryCollection;
import com.emotionoui.oui.diary.entity.Diary;
import com.emotionoui.oui.diary.entity.DiaryType;
import com.emotionoui.oui.diary.exception.NotExitPrivateDiaryException;
import com.emotionoui.oui.diary.exception.NotFoundPrivateDiaryException;
import com.emotionoui.oui.diary.repository.DailyDiaryMongoRepository;
import com.emotionoui.oui.diary.repository.DailyDiaryRepository;
import com.emotionoui.oui.diary.repository.DiaryRepository;
import com.emotionoui.oui.member.repository.MemberRepository;
import com.emotionoui.oui.music.entity.SongMetaCollection;
import com.emotionoui.oui.music.repository.MusicMongoRepository;
import com.emotionoui.oui.member.entity.AlarmType;
import com.emotionoui.oui.member.entity.Member;
import com.emotionoui.oui.member.entity.MemberDiary;
import com.emotionoui.oui.member.repository.MemberDiaryRepository;
import com.emotionoui.oui.music.repository.SongMetaMongoRepository;
import com.emotionoui.oui.music.service.MusicService;
import com.emotionoui.oui.openai.service.CustomBotService;
import com.emotionoui.oui.querydsl.QuerydslRepositoryCustom;
import com.emotionoui.oui.survey.repository.PreferenceRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class DiaryServiceImpl implements DiaryService{

    private final DailyDiaryMongoRepository dailyDiaryMongoRepository;
    private final DailyDiaryRepository dailyDiaryRepository;
    private final DiaryRepository diaryRepository;
    private final EmotionRepository emotionRepository;
    private final MusicMongoRepository musicMongoRepository;
    private final MemberDiaryRepository memberDiaryRepository;
    private final MemberRepository memberRepository;
    private final MusicService musicService;
    private final AlarmService alarmService;
    private final CustomBotService customBotService;
    private final QuerydslRepositoryCustom querydslRepositoryCustom;
    private final PreferenceRepository preferenceRepository;
    private final SongMetaMongoRepository songMetaMongoRepository;


    // 일기 생성하기
    public String createDailyDiary(CreateDailyDiaryReq req, Member member) throws IOException, ExecutionException, InterruptedException {
        
        // MongoDB에 넣을 entity 생성
        DailyDiaryCollection dailyDiaryCollection = DailyDiaryCollection.builder()
                .diaryId(req.getDiaryId())
                .memberId(member.getMemberId())
                .content(req.getDailyContent())
                .nickname(member.getNickname())
                .build();

        // MongoDB에 dailyDiary 정보 저장
        DailyDiaryCollection document = dailyDiaryMongoRepository.insert(dailyDiaryCollection);

        // diaryId로 diary 정보 가져오기
        Diary diary = diaryRepository.findById(req.getDiaryId())
                .orElseThrow(IllegalArgumentException::new);

        // MariaDB에 넣을 entity 생성
        DailyDiary dailyDiary = DailyDiary.builder()
                .diary(diary)
                .mongoId(document.getId().toString())
                .dailyDate(req.getDailyDate())
                .build();

        // MariaDB에 dailyDiary 정보(몽고디비ID 포함) 저장
        DailyDiary newDailyDiary = dailyDiaryRepository.save(dailyDiary);

        // 일기 분석
        analyzeData(newDailyDiary, member, document, diary, 1);

        // 공유 다이어리일 때 친구들에게 본인 일기 알람 전송
        String diaryType = dailyDiary.getDiary().getType().toString();
        if(diaryType.equals("공유"))
            alarmService.sendFriendDiary(diary, newDailyDiary.getId(), member);

        return document.getId().toString();
    }

    // 일기 수정하기
    public Integer updateDailyDiary(CreateDailyDiaryReq req, Integer dailyId){

        // DAILY_DIARY 날짜 업데이트 하기
        DailyDiary dailyDiary = dailyDiaryRepository.findById(dailyId)
                .orElseThrow(IllegalArgumentException::new);

        dailyDiary.updateDailyDate(req.getDailyDate());

        String mongoId = dailyDiary.getMongoId();

        // 몽고디비에 일기 내용 업데이트 하기
        DailyDiaryCollection document = dailyDiaryMongoRepository.findById(mongoId)
                .orElseThrow(IllegalArgumentException::new);

        document.setContent(req.getDailyContent());
        dailyDiaryMongoRepository.save(document);

        Diary diary = diaryRepository.findById(dailyDiary.getDiary().getId())
                .orElseThrow(IllegalArgumentException::new);

        Member member = memberRepository.findById(document.getMemberId())
                .orElseThrow(IllegalArgumentException::new);

        // 일기 분석
        analyzeData(dailyDiary, member, document, diary, 2);

        return dailyId;
    }

    // 일기 삭제하기
    public void deleteDailyDiary(Integer dailyId){
        DailyDiary dailyDiary = dailyDiaryRepository.findById(dailyId)
                .orElseThrow(IllegalArgumentException::new);
        dailyDiary.updateIsDeleted();
        dailyDiaryRepository.save(dailyDiary);
    }

    private void analyzeData(DailyDiary dailyDiary, Member member, DailyDiaryCollection document, Diary diary, Integer type){

        Date dailyDate = dailyDiary.getDailyDate();
        String text = null;

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(document.getContent());

            // objects[0].text 안에 있는 텍스트 파일내용 추출
            text = jsonNode.get("objects").get(0).get("text").asText();

            // 텍스트 내용이 없거나, 10자 이내일 때는 대표감정만 "중립"으로 넣고 텍스트 분석하지 않음
            if(Objects.equals(text, "")||text.length()<10){
                Emotion emotion;
                // 일기 작성이면
                if(type==1){
                    emotion = Emotion.builder()
                            .dailyDiary(dailyDiary)
                            .emotion("neutral")
                            .date(dailyDate)
                            .member(member)
                            .build();
                }
                // 일기 수정이면
                else{
                    emotion = emotionRepository.findByDailyId(dailyDiary.getId());
                    emotion.updateEmotion("neutral");
                }
                emotionRepository.save(emotion);

                EmotionClass emotionClass = new EmotionClass();
                List<String> emotionList = new ArrayList<>();
                emotionList.add("neutral");
                emotionClass.setEmotionList(emotionList);
                document.setEmotion(emotionClass);
                dailyDiaryMongoRepository.save(document);

                return;
            }

            // 텍스트 내용이 존재하면 AI 서버로 분석 요청하기
            // 비동기 처리
            String finalText = text;

            // 1) ChatGPT로 코멘트 기능
            CompletableFuture<Void> future1 = CompletableFuture.runAsync(() ->
                    gptComment(finalText, document));

            // 2) 감정분석 후 노래 추천 기능
            CompletableFuture<Void> future2 = CompletableFuture.runAsync(() -> {
                try {
                    // 감정분석 결과 노래추천 json파일 넘어옴
                    String music = sendDataToAI(finalText, dailyDate, document, dailyDiary, member, type);

                    ObjectMapper objectMapper2 = new ObjectMapper();

                    List<RecommendMusicClass> musicList = null;
                    try {
                        musicList = objectMapper2.readValue(music, new TypeReference<List<RecommendMusicClass>>() {
                        });
                    } catch (IOException e) {
                        log.error("JSON 변환 중 오류 발생: " + e.getMessage());
                    }

//                        for(RecommendMusicClass r : musicList) {
//                            log.info("youtube api 전");
//                            log.info("musicList 입니다 " + r.getSongName());
//                            log.info("musicList 입니다 " + r.getUri());
//                        }

                    assert musicList != null;
                    for (RecommendMusicClass musicOne : musicList) {
                        // youtube uri가 없으면 youtube api로 검색하기 찾기
                        if (musicOne.getUri().equals("")) {
                            String uri = musicService.searchYoutube(musicOne.getSongName(), musicOne.getArtistNameBasket()[0]);
                            log.info("uri 없을 때 api 돌려본 결과값! uri 값! : " + uri);
                            musicOne.setUri(uri);
                            // 몽고디비에 새로 찾은 uri 넣기
                            SongMetaCollection songDocument = songMetaMongoRepository.findByMusicId(musicOne.getId());
                            songDocument.setYoutubeUrl(uri);
                            songMetaMongoRepository.save(songDocument);
                        }
                    }

//                        for(RecommendMusicClass r : musicList) {
//                            log.info("youtube api 후");
//                            log.info("musicList 입니다 " + r.getSongName());
//                            log.info("musicList 입니다 " + r.getUri());
//                        }

                    // 몽고디비에서 일기 정보를 찾아 추천음악 리스트 넣기
                    document.setMusic(musicList);
                    dailyDiaryMongoRepository.save(document);

                } catch (ExecutionException e) {
                    log.info("Execution Exception");
                    throw new RuntimeException(e);
                } catch (InterruptedException e) {
                    log.info("InterruptedException");
                    throw new RuntimeException(e);
                } catch (IOException e) {
                    log.info("IOException");
                    throw new RuntimeException(e);
                }
            });
        } catch (Exception e){
            e.printStackTrace();
            log.info("텍스트 파일 위치를 찾을 수 없습니다.");
        }
    }

    // ChatGPT 코멘트 값 받아서 몽고디비에 저장하기
    private void gptComment(String text, DailyDiaryCollection document){
        String gptResponse = customBotService.chat(text);
        document.setComment(gptResponse);
        dailyDiaryMongoRepository.save(document);
    }

    // AI를 통한 감정분석 및 음악추천 결과값 받기
    public String sendDataToAI(String text, Date dailyDate, DailyDiaryCollection document, DailyDiary dailyDiary, Member member, Integer type) throws ExecutionException, InterruptedException {
        // 감정분석 AI Url
        String aiServerUrl = "http://j10a506.p.ssafy.io:8008/analysis/openvino";
        String aiServerUrl2 = "http://j10a506.p.ssafy.io:8008/recommendation";

        // CompletableFuture를 사용하여 감정분석 요청을 보내고 데이터 받기
        // supplyAsync: 비동기 + 반환값이 있는 경우
        // runAsync: 비동기 + 반환값이 없는 경우
        CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
            // 텍스트 내용 보내고 감정분석 결과 받기
            log.info("sendTextData 전까지 왔나요?");
            return sendTextData(text, aiServerUrl);
        }).thenApply(s -> {
            // thenApply: 반환 값을 받아서 다른 값을 반환함
            // thenAccept: 반환 값을 받아 처리하고 값읋 반환하지 않음
            // thenRun: 반환 값을 받지 않고 다른 작업을 실행함
            ObjectMapper objectMapper = new ObjectMapper();
            EmotionClass emotionRes;
            try {
                // 감정분석 결과를 MongoDB에 넣기
                log.info("emotionRes 까지 왔나요?");
                emotionRes = objectMapper.readValue(s, EmotionClass.class);

                // 대표감정이 아무것도 없을 때 "중립"을 대표감정으로 넣어줌
                if(emotionRes.getEmotionList().isEmpty()){
                    emotionRes.setEmotionList(List.of(new String[]{"neutral"}));
                }

                document.setEmotion(emotionRes);
                dailyDiaryMongoRepository.save(document);

                String newEmotion;
                // 대표감정이 한 개일 때
                if(emotionRes.getEmotionList().size()==1){
                    newEmotion = emotionRes.getEmotionList().get(0);
                }
                else{
                    // "중립" 감정이 1순위일 때는 차순위로 대표감정을 넣음
                    if(emotionRes.getEmotionList().get(0).equals("neutral"))
                        newEmotion = emotionRes.getEmotionList().get(1);
                    else
                        newEmotion = emotionRes.getEmotionList().get(0);
                }

                Emotion emotion;
                // 일기를 저장할 때
                if(type==1){
                    // MariaDB에 대표감정(Emotion) 정보 저장
                    emotion = Emotion.builder()
                            .dailyDiary(dailyDiary)
                            .emotion(newEmotion)
                            .date(dailyDate)
                            .member(member)
                            .build();
                }
                // 일기를 수정할 때
                else {
                    log.info("여기로 들어온거 아니야?");
                    log.info("새로운 감정은? " + newEmotion);
                    log.info("dailyId의 값은? " + dailyDiary.getId());
                    emotion = emotionRepository.findByDailyId(dailyDiary.getId());
                    log.info("emotionId값은? : " + String.valueOf(emotion.getEmotionId()));
                    emotion.updateEmotion(newEmotion);
                }

                emotionRepository.save(emotion);

            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }

            String userType = preferenceRepository.getTypeByMemberId(member.getMemberId());
            userType = userType.equals("Yellow")?"COVT":"REP";

            // AI 서버에 보낼 데이터 생성
            RecommendMusicReq req = RecommendMusicReq.builder()
                    .angry(emotionRes.getAngry())
                    .sad(emotionRes.getSad())
                    .happy(emotionRes.getHappy())
                    .comfortable(emotionRes.getComfortable())
                    .doubtful(emotionRes.getDoubtful())
                    .embarrassed(emotionRes.getEmbarrassed())
                    .user_type(userType)
                    .build();

            // 감정분석 보내고 음악추천 결과 받기
             return sendEmotionData(req, aiServerUrl2);
        });

        return future.get();
    }

    // 감정처리를 위한 요청을 보내고 감정분석 결과를 받는 메서드
    private static String sendTextData(String text, String aiServerUrl) {
        
        log.info("sendTextData 안에 들어왔어");
        log.info("text : " + text);
        log.info("url : " + aiServerUrl);

        String newText = text.replace("\n","\\n");
        // JSON 형식의 문자열 생성
        String jsonBody = "{\"text\": \"" + newText + "\"}";
        log.info("jsonBody: " + jsonBody);

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(aiServerUrl))
                .version(HttpClient.Version.HTTP_1_1)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                .build();

        try {
            HttpResponse<String> emotionData = client.send(request, HttpResponse.BodyHandlers.ofString());
            log.info("emotionData가 나오는 부분: " + emotionData.body());
            return emotionData.body();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // 음악추천을 위한 요청을 보내고 음악추천 결과를 받는 메서드
    private static String sendEmotionData(RecommendMusicReq req, String aiServerUrl) {
        HttpClient client = HttpClient.newHttpClient();

        log.info("sendEmotionData 까지 왔음 !");
        ObjectMapper objectMapper = new ObjectMapper();
        String musicJson = null;
        
        try {
            musicJson = objectMapper.writeValueAsString(req);
            System.out.println(musicJson);
        } catch (Exception e) {
            e.printStackTrace();
        }

        assert musicJson != null;
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(aiServerUrl))
                .version(HttpClient.Version.HTTP_1_1)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(musicJson))
                .build();

        try {
            HttpResponse<String> musicData = client.send(request, HttpResponse.BodyHandlers.ofString());
            log.info(musicData.body().toString());
            return musicData.body();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // 일기 조회하기
    public SearchDailyDiaryRes searchDailyDiary(Integer dailyId, Integer memberId){
        DailyDiary dailyDiary = dailyDiaryRepository.findById(dailyId)
                .orElseThrow(IllegalArgumentException::new);

        DailyDiaryCollection dailyDiaryCollection = dailyDiaryMongoRepository.findById(dailyDiary.getMongoId())
                .orElseThrow(IllegalArgumentException::new);

        return SearchDailyDiaryRes.of(dailyDiaryCollection, dailyDiary, memberId);
    }

    // 오늘의 일기 작성 확인하기
    public Integer searchTodayDiary(Integer diaryId, Integer memberId){
        // 현재 날짜 얻기
        LocalDate currentDate = LocalDate.now();
        // 포맷 지정
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        // 포맷 적용하여 문자열로 변환
        String dateStr = currentDate.format(formatter);
        // 문자열을 Date 객체로 변환
        Date date = java.sql.Date.valueOf(dateStr);

        // 현재 날짜에 쓴 일기가 있으면 dailyId 반환, 아니면 0 반환
        Integer dailyId = dailyDiaryRepository.findTodayDailyId(date, memberId, diaryId);
        return Objects.requireNonNullElse(dailyId, 0);
    }

    // 일기 날짜로 조회하기
    public Boolean searchDailyDiaryByDate(Integer diaryId, String strDate, Integer memberId){

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date date = null;

        try {
            date = formatter.parse(strDate);

            // diaryId, date, isDeleted 확인해서 해당 다이어리에 해당 날짜에 쓰여진 일기 가져오기
            List<Integer> dailyDiaryIds = querydslRepositoryCustom.findByDiaryIdAndDate(diaryId,date);
            if(dailyDiaryIds==null){
                return false;
            }

            // 해당날짜에 쓰여진 일기를 돌면서 자신이 쓴 것이 있다면 true, 없다면 false 반환
            for(int i = 0; i<dailyDiaryIds.size(); i++){
                Integer exists = querydslRepositoryCustom.findByDailyDiaryIdAndDate(dailyDiaryIds.get(i),memberId);
                if(exists==null){
                    continue;
                }else{
                    return true;
                }
            }

        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        return false;
    }

    // 일기 타이틀 아이디로 조회하기
    public String searchDiaryTitleById(Integer diaryId){
        Diary diary = diaryRepository.findById(diaryId).orElseThrow(IllegalArgumentException::new);
        return diary.getName();
    }
    
    // 감정 분석 결과 조회하기
    public EmotionClass searchEmotion(Integer dailyId){
        DailyDiary dailyDiary = dailyDiaryRepository.findById(dailyId)
                .orElseThrow(IllegalArgumentException::new);

        return dailyDiaryMongoRepository.findEmotionByDailyId(dailyDiary.getMongoId()).getEmotion();
    }

    // 음악 추천 결과 조회하기
    public List<RecommendMusicClass> searchMusic(Integer dailyId){
        DailyDiary dailyDiary = dailyDiaryRepository.findById(dailyId)
                .orElseThrow(IllegalArgumentException::new);

        return dailyDiaryMongoRepository.findMusicByDailyId(dailyDiary.getMongoId()).getMusic();
    }

    // 코멘트 조회하기
    public String searchComment(Integer dailyId){
        DailyDiary dailyDiary = dailyDiaryRepository.findById(dailyId)
                .orElseThrow(IllegalArgumentException::new);

        return dailyDiaryMongoRepository.findCommentByDailyId(dailyDiary.getMongoId()).getComment();
    }

    // 다이어리 설정 조회하기
    public SearchDiarySettingRes searchDiarySetting(Integer diaryId, Integer memberId){
        Diary diary = diaryRepository.findById(diaryId)
                .orElseThrow(IllegalArgumentException::new);

        AlarmType alarmStatus = memberDiaryRepository.findAlarmByMemberIdAndDiaryId(diaryId, memberId);

        if(diary.getType().toString().equals("개인")){
            return SearchDiarySettingRes.privateRes(diary, alarmStatus);
        }else{
            List<String> memberList = memberDiaryRepository.findEmailByDiaryId(diaryId);
            return SearchDiarySettingRes.SharingRes(diary, alarmStatus, memberList);
        }
    }
    
     // 다이어리 설정 수정하기
    public void updateDiarySetting(UpdateDiarySettingReq req, Integer diaryId, Member member){
        Diary diary = diaryRepository.findById(diaryId)
                .orElseThrow(IllegalArgumentException::new);
        // 일기 이름, 템플릿 종류 수정
        diary.updateDiary(req.getName(), req.getTemplateId());

        int memberId = member.getMemberId();
        MemberDiary memberDiary = memberDiaryRepository.findByMemberIdAndDiaryId(memberId, diaryId);
        // 알람 ON/OFF 상태 수정
        memberDiary.updateAlarm(req.getAlarm());

        // 새로운 멤버들에게 일기 초대 알림 보내기
        if(diary.getType().toString().equals("공유")){
            alarmService.inviteDiary(req.getMemberList(), diaryId, member.getNickname());
        }
    }

    // 일기 꾸미기
    public DecorateDailyDiaryRes decorateDailyDiary(DecorateDailyDiaryReq req, Member member){
        DecorateDailyDiaryRes res = DecorateDailyDiaryRes.builder()
                .memberId(member.getMemberId())
                .nickname(member.getNickname())
                .oneDecoration(req.getOneDecoration())
                .build();

        return res;
    }


    // 꾸민 내용을 DB에 저장하기
    public String decorateSaveDailyDiary(DecorateDailyDiaryReq req, Integer dailyId){

        DailyDiary dailyDiary = dailyDiaryRepository.findById(dailyId)
                .orElseThrow(IllegalArgumentException::new);

        DailyDiaryCollection dailyDiaryCollection = dailyDiaryMongoRepository.findById(dailyDiary.getMongoId())
                .orElseThrow(IllegalArgumentException::new);

        dailyDiaryCollection.setDecoration(req.getAllDecoration());
        dailyDiaryMongoRepository.save(dailyDiaryCollection);

        return dailyDiaryCollection.getId().toString();
    }

    // 다이어리 나가기
    @Override
    public void exitShareDiary(Integer diaryId, int memberId) {
        // 공유 다이어리인지 확인
        Optional<Diary> diary = diaryRepository.findById(diaryId);
        if(!diary.get().getType().equals(DiaryType.공유)){
            throw new NotExitPrivateDiaryException();
        }
        // 멤버 다이어리 DB에서 삭제처리하기
        querydslRepositoryCustom.exitSharDiaryByMemberIdAndDiaryId(diaryId, memberId);
    }

    // 개인 다이어리 -> 공유 다이어리로 가져오기
    @Override
    public void syncDiary(Integer memberId, Integer diaryId) {
//         memberDiary에서 order가 1이고, memberId가 같은 다이어리 id 찾기(이게 개인일기)
//         dailyDiary에서 해당 다이어리 id이고, 오늘 날짜인 dailyDiary id 찾기
        Integer dailyDiaryId = querydslRepositoryCustom.searchDailyDiaryId(memberId, diaryId);

        if (dailyDiaryId == null) {
            // dailyDiaryId가 null이면 아직 개인일기를 안 쓴 상태이므로 예외 발생
            throw new NotFoundPrivateDiaryException();
        }

//      오늘 일기 찾기
        DailyDiary todayDailyDiary= dailyDiaryRepository.findById(dailyDiaryId).get();
//      dailyDiary DB 에 새로운 행 추가(동기화 할 공유 diaryId)
        DailyDiary newDailyDiary = DailyDiary.builder()
                .dailyDate(todayDailyDiary.getDailyDate())
                .mongoId(todayDailyDiary.getMongoId())
                .diary(diaryRepository.findById(diaryId).get())
                .build();
        dailyDiaryRepository.save(newDailyDiary);
    }


    // musicIdList를 가지고 spotifyUriList를 만들기
    private List<String> findSpotifyUri(String musicString){
        // JsonString 파일을 List<Integer> 리스트로 만들기
        List<Integer> musicIdList = new ArrayList<>();
        String[] musicIds = musicString.split(",");
        for(String musicId : musicIds){
            musicIdList.add(Integer.parseInt(musicId.trim()));
        }

        List<String> list = new ArrayList<>();

        return list;
    }

    // mongoDB Id로 일기 찾기
    @Override
    public Integer findDailyDiaryIdByMongoId(String mongoId){
        System.out.println("mongoId = " + mongoId);
        Integer dailyDiaryId = dailyDiaryRepository.findDailyDiaryIdByMongoId(mongoId);
        return dailyDiaryId;
    }
}