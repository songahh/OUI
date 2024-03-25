package com.emotionoui.oui.alarm.service;

import com.emotionoui.oui.alarm.domain.AlarmMessage;
import com.emotionoui.oui.alarm.dto.req.AlarmTestReq;
import com.emotionoui.oui.alarm.dto.res.SearchAlarmsRes;
import com.emotionoui.oui.alarm.entity.Alarm;
import com.emotionoui.oui.alarm.entity.AlarmContentType;
import com.emotionoui.oui.alarm.entity.FcmInfo;
import com.emotionoui.oui.alarm.repository.AlarmRepository;
import com.emotionoui.oui.alarm.repository.FcmInfoRepository;
import com.emotionoui.oui.diary.entity.Diary;
import com.emotionoui.oui.diary.repository.DiaryRepository;
import com.emotionoui.oui.member.entity.Member;
import com.emotionoui.oui.member.entity.MemberAlarm;
import com.emotionoui.oui.member.repository.MemberAlarmRepository;
import com.emotionoui.oui.member.repository.MemberRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.messaging.BatchResponse;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.MulticastMessage;
import com.google.firebase.messaging.SendResponse;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class AlarmServiceImpl implements AlarmService{

    private final AlarmRepository alarmRepository;
    private final MemberAlarmRepository memberAlarmRepository;
    private final FcmInfoRepository fcmInfoRepository;
    private final MemberRepository memberRepository;
    private final DiaryRepository diaryRepository;

    @Value("http://localhost:8080")
    String domain;

    @Value("http://localhost:3000")
    String API_URL;

//    @PersistenceContext
//    private EntityManager entityManager;

    private final ObjectMapper objectMapper;

    // 알림 리스트
    public List<SearchAlarmsRes> searchAlarmList(Integer memberId) {
        List<MemberAlarm> memberAlarms = memberAlarmRepository.findByMemberId(memberId);
        List<SearchAlarmsRes> searchAlarmsResList = new ArrayList<>();

        for (MemberAlarm memberAlarm : memberAlarms) {
            Alarm alarm = memberAlarm.getAlarm();
            SearchAlarmsRes searchAlarmsRes = SearchAlarmsRes.builder()
                    .alarmId(alarm.getId())
                    .alarmContentType(alarm.getType())
                    .title(alarm.getTitle())
                    .content(alarm.getContent())
                    .build();
            searchAlarmsResList.add(searchAlarmsRes);
        }

        return searchAlarmsResList;
    }

//    // 알림 읽음 표시
//    @Override
//    public String readMessage(Long notificationId) {
//        // 해당 알림 SELECT
//        Optional<NotificationEntity> notificationEntityOptional = fcmNotificationRepository.findByNotificationId(notificationId);
//        if (notificationEntityOptional.isPresent()) {
//            NotificationEntity notificationEntity = notificationEntityOptional.get();
//            notificationEntity.setReadStatus(true);
//
//            // 데이터베이스에 변경 내용 저장
//            NotificationEntity dbNotificationEntity = fcmNotificationRepository.save(notificationEntity);
//
//            String URL = "";
//            // 알림 타입 확인
//            if(dbNotificationEntity.getNotificationType() == NotificationType.Chatting){
//                URL =  "/chatRoom";
//            }
//            else{
//                URL =  "/barter/" + notificationEntity.getArticleId();
//            }
//            return URL;
//        }
//        return "";
//    }
//
//    // 알림 제거
//    @Override
//    public Boolean deleteMessage(Long notificationId) {
//        // 알림 유무 확인
//        Optional<NotificationEntity> notificationEntityOptional = fcmNotificationRepository.findByNotificationId(notificationId);
//        if (notificationEntityOptional.isPresent()) {
//            NotificationEntity notificationEntity = notificationEntityOptional.get();
//            notificationEntity.setDeleteStatus(true);
//
//            // 데이터베이스에 변경 내용 저장
//            fcmNotificationRepository.save(notificationEntity);
//            return true;
//        }
//        return false;
//    }
//
//    // 채팅알림 보내기 포스트 맨 테스트 용
//    @Override
//    public Boolean sendChatMessage(NotificationDto notificationDto) {
//        Optional<UserEntity> senderUserOptional, receiverUserOptional;
//        if(notificationDto.getUserId().equals(notificationDto.getOwnerId())){
//            senderUserOptional = userRepository.findByUserId(notificationDto.getOwnerId());
//            receiverUserOptional = userRepository.findByUserId(notificationDto.getVisitedId());
//        }
//        else{
//            senderUserOptional = userRepository.findByUserId(notificationDto.getVisitedId());
//            receiverUserOptional = userRepository.findByUserId(notificationDto.getOwnerId());
//        }
//
//        // 채팅방으로 회원 정보 가져오기
////        Optional<UserEntity> userEntityOptional = userRepository.findByUserId(notificationDto.getReceiverId());
//        if (senderUserOptional.isPresent() && receiverUserOptional.isPresent()) {
//            UserEntity senderUserEntity = senderUserOptional.get();
//            UserEntity receiverUserEntity = receiverUserOptional.get();
//            log.info("senderUser_id : {}, receiverUser_id : {}", senderUserEntity.getUserId(), receiverUserEntity.getUserId());
//
//            notificationDto.setSenderId(senderUserEntity.getNickname());
//            notificationDto.setReceiverId(receiverUserEntity.getNickname());
//
//            notificationDto.setTitle(receiverUserEntity.getNickname() + "님 채팅 도착하였습니다!");
//            notificationDto.setContent(senderUserEntity.getNickname() + "으로부터 새로운 채팅이 왔어요!! 확인 해보세요!!");
//            notificationDto.setLink(domain + "/chat"); // 채팅함으로 이동
//
//            NotificationEntity notificationEntity = NotificationEntity.builder()
//                    .userEntity(receiverUserEntity)
//                    .title(notificationDto.getTitle())
//                    .content(notificationDto.getContent()) // 알림 내용
//                    .readStatus(false) // 읽지 않은 상태로 초기화
//                    .notificationType(NotificationType.Chatting)
//                    .deleteStatus(false)
//                    .build();
//
//            // 데이터베이스에 저장
//            fcmNotificationRepository.save(notificationEntity);
//        } else {
//            log.info("User with id not found");
//            return false;
//        }
//
//        // 유저의 디바이스 정보 가져오기
//        Optional<UserDeviceEntity> userDeviceEntityOptional = userDeviceRepository.findByUserId(receiverUserOptional.get().getUserId());
//        if (userDeviceEntityOptional.isPresent()) {
//            UserDeviceEntity userDeviceEntity = userDeviceEntityOptional.get();
//
//            try{
//                // 메세지 보내기
//                String message = makeMessage(
//                        userDeviceEntity.getDeviceToken(), notificationDto.getTitle(),
//                        notificationDto.getContent(), notificationDto.getLink()
//                );
//                sendMessage(message);
//                return true;
//            } catch (Exception e){
//                log.info("request error");
//                return false;
//            }
//        }
//        else {
//            log.info("UserDevice with id {} not found", notificationDto.getReceiverId());
//            return false;
//        }
//    }
//
//

    // 초대한 사람들에게 알림 보내기
    public void inviteDiary(List<String> emails, Integer diaryId, String createrNickname){
        Diary diary = diaryRepository.findById(diaryId)
                .orElseThrow(IllegalArgumentException::new);
        String diaryName = diary.getName();

        String title, content, link;
        title = "공유 다이어리 초대";
        content = "'" + createrNickname + "'님이 '" + diaryName + "' 다이어리에 초대했어요.";
        // 알림창으로 이동해야 함
        link = "http://localhost:8080/alarm/mainPage";

        List<String> deviceTokens = new ArrayList<>();
        List<String> sendFail = new ArrayList<>();

        Alarm alarm = Alarm.builder()
                .type(AlarmContentType.Invite)
                .title(title)
                .content(content)
                .build();

        alarmRepository.save(alarm);

        for(String email : emails){
            Member member = memberRepository.findByEmail(email)
                    .orElseThrow(IllegalArgumentException::new);

            MemberAlarm memberAlarm = MemberAlarm.builder()
                    .alarm(alarm)
                    .member(member)
                    .diary(diary)
                    .isDeleted(0)
                    .build();

            memberAlarmRepository.save(memberAlarm);

            // test용
            deviceTokens.add("eCKbs2zkGtXCXhHZh_KGnb:APA91bF5LuFA_AumHn330BdsSMHafPz8uTWe-Ku3Jgma-VX4HWF7D0rLqIn1TlEUItbphs4wopekhFT2WtRjBfopss74rhvH2CqJbr72G3nxZerwhAc8Hu0JJUVYHdZwH6JwVknQVaTz");
//            deviceTokens.add(member.getFcmInfo().getDeviceToken());
        }

        if(!deviceTokens.isEmpty()) {
            try {
                // 메세지 보내기
                MulticastMessage message = MulticastMessage.builder()
                        .addAllTokens(deviceTokens)
                        .putData("title", title)
                        .putData("body", content)
                        .putData("link", link)
                        .build();
                BatchResponse response = FirebaseMessaging.getInstance().sendMulticast(message);

                // 실패한 토큰 수
                if (response.getFailureCount() > 0) {
                    List<SendResponse> responses = response.getResponses();
                    for (SendResponse respons : responses) {
                        if (!respons.isSuccessful()) {
                            // The order of responses corresponds to the order of the registration tokens.
                            sendFail.add(deviceTokens.get(responses.indexOf(respons)));
                        }
                    }
                }
            } catch (Exception e) {
                log.info("request error");
            }

            // 실패한 요청에 대한 재요청
            if (!sendFail.isEmpty()) {
                try {
                    // 메세지 보내기
                    MulticastMessage message = MulticastMessage.builder()
                            .addAllTokens(sendFail)
                            .putData("title", title)
                            .putData("body", content)
                            .putData("link", link)
                            .build();
                    BatchResponse response = FirebaseMessaging.getInstance().sendMulticast(message);

                    // 실패한 토큰 수
                    List<SendResponse> responses = response.getResponses();
                    for (SendResponse respons : responses) {
                        if (!respons.isSuccessful()) {
                            sendFail.add(sendFail.get(responses.indexOf(respons)));
                        }
                    }

                    for(int i=0; i<responses.size(); ++i){
                        sendFail.remove(0);
                    }

                } catch (Exception e) {
                    log.info("request error");
                }
            }
        }
    }

    // 채팅 메세지 등록 후 알림 등록
//    @Override
//    public Boolean sendChatMessage(ChatRoom chatRoom, String userId) {
//        String senderNickname, receiverNickname;
//        String title, content, link; // 채팅함으로 이동
//
//        //전달받은 userId를 chatRoom에 있는 ownerId, visiterId를 비교하여 같은게 작성자, 다른게 수신자
//        Optional<UserEntity> senderUserOptional, receiverUserOptional;
//        if(userId.equals(chatRoom.getOwnerId())){
//            senderUserOptional = userRepository.findByUserId(chatRoom.getOwnerId());
//            receiverUserOptional = userRepository.findByUserId(chatRoom.getVisiterId());
//        }
//        else{
//            senderUserOptional = userRepository.findByUserId(chatRoom.getVisiterId());
//            receiverUserOptional = userRepository.findByUserId(chatRoom.getOwnerId());
//        }
//
//        // 채팅방으로 회원 정보 가져오기
//        if (senderUserOptional.isPresent() && receiverUserOptional.isPresent()) {
//            UserEntity senderUserEntity = senderUserOptional.get();
//            UserEntity receiverUserEntity = receiverUserOptional.get();
//            log.info("senderUser_id : {}, receiverUser_id : {}", senderUserEntity.getUserId(), receiverUserEntity.getUserId());
//
//            senderNickname = senderUserEntity.getNickname();
//            receiverNickname = receiverUserEntity.getNickname();
//
//            title = receiverNickname + "님 채팅이 도착했어요!";
//            content = senderNickname + "님으로부터 새로운 채팅이 왔어요!";
//            link = domain + "/chat"; // 채팅함으로 이동
//
//            NotificationEntity notificationEntity = NotificationEntity.builder()
//                    .userEntity(receiverUserEntity)
//                    .title(title)
//                    .content(content) // 알림 내용
//                    .readStatus(false) // 읽지 않은 상태로 초기화
//                    .notificationType(NotificationType.Chatting)
//                    .deleteStatus(false)
//                    .build();
//
//            // 데이터베이스에 저장
//            fcmNotificationRepository.save(notificationEntity);
//        } else {
//            log.info("User with id not found");
//            return false;
//        }
//
//        // 유저의 디바이스 정보 가져오기
//        Optional<UserDeviceEntity> userDeviceEntityOptional = userDeviceRepository.findByUserId(receiverUserOptional.get().getUserId());
//        if (userDeviceEntityOptional.isPresent()) {
//            UserDeviceEntity userDeviceEntity = userDeviceEntityOptional.get();
//
//            try{
//                // 메세지 보내기
//                String message = makeMessage(
//                        userDeviceEntity.getDeviceToken(), title, content, link
//                );
//                sendMessage(message);
//                return true;
//            } catch (Exception e){
//                log.info("request error");
//                return false;
//            }
//        }
//        else {
//            log.info("UserDevice with id {} not found", receiverUserOptional.get().getUserId());
//            return false;
//        }
//    }
//
//    // 갈망포카 메세지 전송
//    @Override
//    public Boolean sendBiasMessage(List<String> ids, Long articleId) {
//
//        String title = "갈망포카 출현!";
//        String content = "새로운 갈망포카가 올라 왔어요!! 확인해보세요!!";
//        String link = domain + "/post/" + articleId;
//
//        List<String> deviceTokens = new ArrayList<>();
//        List<String> sendFail = new ArrayList<>();
//        List<Integer> requestError = new ArrayList<>();
//
//        int total = ids.size();
//        for (int i = 0; i < ids.size(); i++){
//            // 유저 정보 가져오기
//            Optional<UserEntity> userEntityOptional = userRepository.findByUserId(ids.get(i));
//            if (userEntityOptional.isPresent()) {
//                UserEntity userEntity = userEntityOptional.get();
//                log.info("user_id : {}", userEntity.getUserId());
//
//                NotificationEntity notificationEntity = NotificationEntity.builder()
//                        .userEntity(userEntity)
//                        .title(title)
//                        .content(content) // 알림 내용
//                        .readStatus(false) // 읽지 않은 상태로 초기화
//                        .notificationType(NotificationType.Article) // 알림 유형 설정, 실제 유형으로 교체 필요
//                        .articleId(articleId) // 관련 글 ID, 필요한 경우 설정
//                        .deleteStatus(false)
//                        .build();
//                // 데이터베이스에 저장
//                fcmNotificationRepository.save(notificationEntity);
//            } else {
//                log.info("User with id {} not found", ids.get(i));
//                continue;
//            }
//
//            // 유저들의 디바이스 정보 가져오기
//            deviceTokens = customFCMNotificationRepository.findDeviceTokensByIds(ids);
//        }
//
//        if(!deviceTokens.isEmpty()) {
//            // 500개 단위로 나누기 - 한번에 처리할 수 있는 메세지 개수는 500개
//            int fullBatches = total / 500;
//            int remaining = total % 500;
//
//            for (int i = 0; i <= fullBatches; i++) {
//                int start = i * 500;
//                int end = Math.min((i + 1) * 500, total);
//
//                List<String> batchTokens = deviceTokens.subList(start, end);
//                log.info("{}번 실행", i);
//                try {
//                    // 메세지 보내기
//                    MulticastMessage message = MulticastMessage.builder()
//                            .addAllTokens(batchTokens)
//                            .putData("title", title)
//                            .putData("content", content)
//                            .putData("link", link)
//                            .build();
//                    BatchResponse response = FirebaseMessaging.getInstance().sendMulticast(message);
//                    log.info(response.getSuccessCount() + " messages were sent successfully.");
//
//                    // 실패한 토큰 수
//                    if (response.getFailureCount() > 0) {
//                        List<SendResponse> responses = response.getResponses();
//                        for (SendResponse respons : responses) {
//                            if (!respons.isSuccessful()) {
//                                // The order of responses corresponds to the order of the registration tokens.
//                                sendFail.add(batchTokens.get(i));
//                            }
//                        }
//                    }
//                } catch (Exception e) {
//                    log.info("request error");
//                    requestError.add(i);
//                }
//            }
//            // 실패한 요청에 대한 재요청
//            if (!sendFail.isEmpty()) {
//                fullBatches = sendFail.size() / 500;
//                for(int i = 0; i <= fullBatches; i++) {
//                    int start = i * 500;
//                    int end = Math.min((i + 1) * 500, total);
//
//                    List<String> batchTokens = sendFail.subList(start, end);
//                    try {
//                        // 메세지 보내기
//                        MulticastMessage message = MulticastMessage.builder()
//                                .addAllTokens(batchTokens)
//                                .putData("title", title)
//                                .putData("content", content)
//                                .putData("link", link)
//                                .build();
//
//                        BatchResponse response = FirebaseMessaging.getInstance().sendMulticast(message);
//                        log.info(response.getSuccessCount() + " messages were sent successfully.");
//
//                        // 실패한 토큰 수
//                        if (response.getFailureCount() > 0) {
//                            List<SendResponse> responses = response.getResponses();
//                            for (int j = 0; j < responses.size(); j++) {
//                                if (!responses.get(j).isSuccessful()) {
//                                    // The order of responses corresponds to the order of the registration tokens.
//                                    sendFail.add(batchTokens.get(i));
//                                }
//                            }
//                        }
//                    } catch (Exception e) {
//                        log.info("request error");
//                        requestError.add(i);
//                    }
//                }
//            }
//            return true;
//        }
//        return false;
//    }
//
////    public List<String> findDeviceTokensByIds(List<String> ids) {
////        TypedQuery<String> query = entityManager.createQuery(
////                "SELECT ud.deviceToken FROM UserDeviceEntity ud WHERE ud.userId IN :ids", String.class);
////        query.setParameter("ids", ids);
////        return query.getResultList();
////    }
//
    public void createDeviceToken(Member member, String deviceToken){
        FcmInfo fcmInfo = fcmInfoRepository.findByMember(member);

        if(fcmInfo!=null){
            fcmInfo.updateDeviceToken(deviceToken);
        }
        else{
            FcmInfo info = FcmInfo.builder()
                    .member(member)
                    .deviceToken(deviceToken)
                    .build();

            fcmInfoRepository.save(info);
        }
    }

    // 메세지 보내기 테스트용
    @Override
    public void sendMessageTo(AlarmTestReq alarmTestReq) throws IOException {

        String message = makeMessage(
                alarmTestReq.getTargetToken(), alarmTestReq.getTitle(),
                alarmTestReq.getBody(), alarmTestReq.getLink()
        );

        log.info(message);

        OkHttpClient client = new OkHttpClient();
        RequestBody requestBody = RequestBody.create(message,
                MediaType.get("application/json; charset=utf-8"));
        Request request = new Request.Builder()
                // .url(API_URL)
                .url("https://fcm.googleapis.com/v1/projects/project-oui/messages:send")
                .post(requestBody)
                .addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + getAccessToken())
                .addHeader(HttpHeaders.CONTENT_TYPE, "application/json; UTF-8")
                .build();

        Response response = client.newCall(request).execute();

        System.out.println("무슨값이 찍히는거야: " + response.body().string());
    }

    // 채팅 알림 메세지 만들기
    private String makeMessage(String targetToken, String title, String body, String link) throws JsonProcessingException {
        AlarmMessage alarmMessage = AlarmMessage.builder()
                .message(AlarmMessage.Message.builder()
                        .token(targetToken)
                        .data(Map.of(
                                "title", title,
                                "body", body,
                                "link", link
                                // "image", "이미지_URL" // 이미지 URL을 추가할 경우
                        ))
                        .build())
                .validateOnly(false)
                .build();
        return objectMapper.writeValueAsString(alarmMessage);
    }

    // 알림 메세지 보내기
    private void sendMessage(String message) throws Exception{
        OkHttpClient client = new OkHttpClient();
        RequestBody requestBody = RequestBody.create(message,
                MediaType.get("application/json; charset=utf-8"));

        Request request = new Request.Builder()
                .url(API_URL)
                .post(requestBody)
                .addHeader(HttpHeaders.AUTHORIZATION, "Bearer " + getAccessToken())
                .addHeader(HttpHeaders.CONTENT_TYPE, "application/json; UTF-8")
                .build();
        Response response = client.newCall(request).execute();
        System.out.println(response.body().string());
    }

    // 토큰 받아오기
    private String getAccessToken() throws IOException {
        String firebaseConfigPath = "env/firebase_service_key.json";

        GoogleCredentials googleCredentials = GoogleCredentials
                .fromStream(new ClassPathResource(firebaseConfigPath).getInputStream())
                .createScoped(List.of("https://www.googleapis.com/auth/cloud-platform"));

        googleCredentials.refreshIfExpired();
        return googleCredentials.getAccessToken().getTokenValue();
    }
}
