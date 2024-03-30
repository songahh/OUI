//package com.emotionoui.oui.chatgpt.config;
//
//import jdk.jfr.ContentType;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpHeaders;
//import org.springframework.http.MediaType;
//
//@Configuration
//public class ChatgptConfig {
//    @Value("${openai.api-key}")
//    private String secretKey;
//
//    @Bean
//    public HttpHeaders httpHeaders() {
//        HttpHeaders headers = new HttpHeaders();
//        headers.setBearerAuth(secretKey);
//        headers.setContentType(MediaType.APPLICATION_JSON);
//        return headers;
//    }
//
//}
