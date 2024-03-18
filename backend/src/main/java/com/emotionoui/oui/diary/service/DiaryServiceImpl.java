package com.emotionoui.oui.diary.service;

import com.emotionoui.oui.diary.dto.req.CreateDailyDiaryReq;
import com.emotionoui.oui.diary.dto.req.UpdateDailyDiaryReq;
import com.emotionoui.oui.diary.dto.res.SearchDailyDiaryRes;
import com.emotionoui.oui.diary.entity.DailyDiary;
import com.emotionoui.oui.diary.entity.DailyDiaryCollection;
import com.emotionoui.oui.diary.repository.DailyDiaryMongoRepository;
import com.emotionoui.oui.diary.repository.DailyDiaryRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class DiaryServiceImpl implements DiaryService{

    private final DailyDiaryMongoRepository dailyDiaryMongoRepository;
    private final DailyDiaryRepository dailyDiaryRepository;
    private RestTemplate restTemplate;

    // 일기 생성하기
    public String createDailyDiary(CreateDailyDiaryReq req) throws IOException, ExecutionException, InterruptedException {
        DailyDiaryCollection dailyDiaryCollection = DailyDiaryCollection.builder()
                .diaryId(req.getDiaryId())
                .content(req.getDailyContent())
                .isDeleted(0)
                .build();

        DailyDiaryCollection document = dailyDiaryMongoRepository.insert(dailyDiaryCollection);

        DailyDiary dailyDiary = DailyDiary.builder()
                .diary(null) // 나중에 수정예정
                .mongoId(document.getId().toString())
                .build();

        dailyDiaryRepository.save(dailyDiary);

        String text = null;
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(req.getDailyContent());

            // objects[0].text 안에 있는 텍스트 파일내용 추출
            text = jsonNode.get("Objects").get(0).get("text").asText();
        } catch (Exception e){
            e.printStackTrace();
            log.info("텍스트 파일 내용을 찾을 수 없습니다.");
        }

//        sendDataToAI(text);

        return document.getId().toString();
    }

    @Async
    public CompletableFuture<List<String>> processAsync(String text, String aiServerUrl) {
        //ResponseEntity<List<String>> responseEntity = restTemplate.postForEntity(aiServerUrl, text, List.class);
        //return CompletableFuture.completedFuture(responseEntity.getBody());
        return CompletableFuture.completedFuture(null);
    }

//    public List<String> sendDataToAI(String text) throws InterruptedException, ExecutionException {
//        // 감정분석 AI Url
//        String aiServer1Url = "http://ai-server-1/process-data";
//        String aiServer2Url = "http://ai-server-2/process-data";
//
//        // AI 서버에 데이터를 비동기적으로 전송하고 결과를 받아옴
//        CompletableFuture<List<String>> result1 = processAsync(text, aiServer1Url); //
//        CompletableFuture<List<String>> result2 = processAsync(text, aiServer2Url); //
//
//        list<String> result1 = processSynchronously(text, aiServer1Url
//
//        // 모든 AI 서버에서의 처리가 완료될 때까지 대기
//        CompletableFuture.allOf(result1, result2).join();
//
//        // 결과를 리스트에 추가
//        List<String> combinedResult = result1.get();
//        combinedResult.addAll(result2.get());
//
//        return combinedResult;
//    }

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
}