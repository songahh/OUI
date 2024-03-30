//package com.emotionoui.oui.chatgpt.service;
//
//import com.emotionoui.oui.chatgpt.config.ChatgptConfig;
//import com.emotionoui.oui.chatgpt.dto.ChatCompletion;
//import com.fasterxml.jackson.core.JsonProcessingException;
//import com.fasterxml.jackson.core.type.TypeReference;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.HttpEntity;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.HttpMethod;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Slf4j
//@Service
//public class ChatgptServiceImpl implements ChatgptService{
//    private final ChatgptConfig chatgptConfig;
//
//    public ChatgptServiceImpl(ChatgptConfig chatgptConfig) {
//        this.chatgptConfig = chatgptConfig;
//    }
//
////    @Value("${openai.api-url}")
//    private String promptUrl = "https://api.openai.com/v1/chat/completions";
//
//    /**
//     * 신규 모델에 대한 프롬프트
//     *
//     * @param chatCompletion {}
//     * @return chatCompletion
//     */
//    @Override
//    public Map<String, Object> prompt(ChatCompletion chatCompletion) {
//        log.debug("[+] 신규 프롬프트를 수행합니다.");
//
//        Map<String, Object> resultMap = new HashMap<>();
//        // [STEP1] 토큰 정보가 포함된 Header를 가져옵니다.
//        HttpHeaders headers = chatgptConfig.httpHeaders();
//
//        RestTemplate restTemplate = new RestTemplate();
//
//        // [STEP5] 통신을 위한 RestTemplate을 구성합니다.
//        HttpEntity<ChatCompletion> requestEntity = new HttpEntity<>(chatCompletion, headers);
//        System.out.println(requestEntity.getBody());
//        System.out.println(requestEntity.getHeaders());
//        ResponseEntity<String> response = restTemplate
//                .exchange(promptUrl, HttpMethod.POST, requestEntity, String.class);
//        try {
//            // [STEP6] String -> HashMap 역직렬화를 구성합니다.
//            ObjectMapper om = new ObjectMapper();
//            resultMap = om.readValue(response.getBody(), new TypeReference<>() {
//            });
//        } catch (JsonProcessingException e) {
//            log.debug("JsonMappingException :: " + e.getMessage());
//        } catch (RuntimeException e) {
//            log.debug("RuntimeException :: " + e.getMessage());
//        }
//        return resultMap;
//    }
//
//}
