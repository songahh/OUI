package com.emotionoui.oui.diary.service;

import com.emotionoui.oui.diary.dto.EmotionClass;
import com.emotionoui.oui.diary.dto.MusicClass;
import com.emotionoui.oui.diary.dto.req.CreateDailyDiaryReq;
import com.emotionoui.oui.diary.dto.req.UpdateDailyDiaryReq;
import com.emotionoui.oui.diary.dto.res.SearchDailyDiaryRes;
import com.emotionoui.oui.diary.entity.DailyDiary;
import com.emotionoui.oui.diary.entity.DailyDiaryCollection;
import com.emotionoui.oui.diary.entity.Diary;
import com.emotionoui.oui.diary.repository.DailyDiaryMongoRepository;
import com.emotionoui.oui.diary.repository.DailyDiaryRepository;
import com.emotionoui.oui.diary.repository.DiaryRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;
import java.util.Objects;
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
    private RestTemplate restTemplate;
    private static String emotionString;
    private static String musicString;
    private static DailyDiaryCollection document;

    // 일기 생성하기
    public String createDailyDiary(CreateDailyDiaryReq req) throws IOException, ExecutionException, InterruptedException {
        
        // 몽고디비에 넣을 entity 생성
        DailyDiaryCollection dailyDiaryCollection = DailyDiaryCollection.builder()
                .diaryId(req.getDiaryId())
                .content(req.getDailyContent())
                .isDeleted(0)
                .build();

        // 몽고디비에 dailyDiary 정보 저장하기
        document = dailyDiaryMongoRepository.insert(dailyDiaryCollection);

        // diaryId로 diary 정보 가져오기
        Diary diary = diaryRepository.findById(req.getDiaryId())
                .orElseThrow(IllegalArgumentException::new);

        DailyDiary dailyDiary = DailyDiary.builder()
                .diary(diary)
                .mongoId(document.getId().toString())
                .build();

        // 마리아디비에 dailyDiary 정보(몽고디비ID 포함) 저장하기
        dailyDiaryRepository.save(dailyDiary);

        String text = null;

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(req.getDailyContent());

            // objects[0].text 안에 있는 텍스트 파일내용 추출
            text = jsonNode.get("objects").get(0).get("text").asText();
            // 텍스트 내용이 존재하면 AI 서버로 분석 요청하기
            if(!Objects.equals(text, "")){
//                emotionString = null;
//                musicString = null;
//                sendDataToAI(text);
            }

        } catch (Exception e){
            e.printStackTrace();
            log.info("텍스트 파일 위치를 찾을 수 없습니다.");
        }

        return document.getId().toString();
    }

    public void sendDataToAI(String text) throws InterruptedException, ExecutionException {
        // 감정분석 AI Url
        String aiServerUrl = "http://ai-server-1/process-data";
        String aiServerUrl2 = "http://ai-server-2/process-data";


        // CompletableFuture를 사용하여 감정분석 요청을 보내고 데이터 받기
        // supplyAsync: 비동기 + 반환값이 있는 경우
        // runAsync: 비동기 + 반환값이 없는 경우
        CompletableFuture<String> future = CompletableFuture.supplyAsync(() -> {
            // 텍스트 내용 보내고 감정분석 결과 받기
            return sendTextData(text, aiServerUrl);
        }).thenApply(s -> {
            // thenApply: 반환 값을 받아서 다른 값을 반환함
            // thenAccept: 반환 값을 받아 처리하고 값읋 반환하지 않음
            // thenRun: 반환 값을 받지 않고 다른 작업을 실행함
            ObjectMapper objectMapper = new ObjectMapper();
            try {
                // 감정분석 결과를 몽고디비에 넣기
                EmotionClass emotionRes = objectMapper.readValue(emotionString, EmotionClass.class);
                document.setEmotion(emotionRes);
                dailyDiaryMongoRepository.save(document);
            } catch (JsonProcessingException e) {
                throw new RuntimeException(e);
            }
            // 감정분석 보내고 음악추천 결과 받기
            return sendEmotionData(s, aiServerUrl2);
        });

        musicString = future.get();
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            // 감정분석 결과를 몽고디비에 넣기
            // 이부분 송아 spotify 값 넣는 식으로 가야함 ㅇ0ㅇ



            MusicClass musicClass = objectMapper.readValue(musicString, MusicClass.class);

            document.setMusic(musicClass);


            dailyDiaryMongoRepository.save(document);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    // 감정처리를 위한 요청을 보내고 감정분석 결과를 받는 메서드
    private static String sendTextData(String text, String aiServerUrl) {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(aiServerUrl))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(text))
                .build();

        try {
            HttpResponse<String> emotionData = client.send(request, HttpResponse.BodyHandlers.ofString());
            return emotionString = emotionData.body();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    // 음악추천을 위한 요청을 보내고 음악추천 결과를 받는 메서드
    private static String sendEmotionData(String emotionData, String aiServerUrl) {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(aiServerUrl))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(emotionData))
                .build();

        try {
            HttpResponse<String> musicData = client.send(request, HttpResponse.BodyHandlers.ofString());
            return musicData.body();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    // 일기 수정하기
    public String updateDailyDiary(UpdateDailyDiaryReq req){
        DailyDiaryCollection document = dailyDiaryMongoRepository.findById(req.getDailyDiaryId())
                .orElseThrow(IllegalArgumentException::new);

        document.setContent(req.getDailyContent());

//        DailyDiaryCollection dailyDiaryCollection = DailyDiaryCollection.builder()
//                .id(req.getDailyDiaryId())
//                .diaryId(req.getDiaryId())
//                .content(req.getDailyContent())
//                .isDeleted(0)
//                .build();

        dailyDiaryMongoRepository.save(document);
        return document.getId().toString();
    }

    // 일기 삭제하기
    public void deleteDailyDiary(String dailyId){
        DailyDiaryCollection document = dailyDiaryMongoRepository.findById(dailyId)
                .orElseThrow(IllegalArgumentException::new);
        document.setIsDeleted(1);
        dailyDiaryMongoRepository.save(document);
    }

    // 일기 조회하기
    public SearchDailyDiaryRes searchDailyDiary(String dailyId){
        DailyDiaryCollection dailyDiaryCollection = dailyDiaryMongoRepository.findById(dailyId)
                .orElseThrow(IllegalArgumentException::new);

        return SearchDailyDiaryRes.of(dailyDiaryCollection);
    }


    public EmotionClass searchEmotion(String dailyId){
        DailyDiaryCollection dailyDiaryCollection = dailyDiaryMongoRepository.getEmotion(dailyId);
        log.info("다이어리아이디 못 들고오나요? : " +dailyDiaryCollection.getDiaryId());
        log.info("Angry 정도는? " + String.valueOf(dailyDiaryCollection.getEmotion().getAngry()));
        //return dailyDiaryMongoRepository.getEmotion(dailyId);
        return null;
    }
}