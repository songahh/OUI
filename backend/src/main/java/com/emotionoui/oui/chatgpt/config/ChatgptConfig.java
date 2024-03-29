package com.emotionoui.oui.chatgpt.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

@Configuration
public class ChatgptConfig {
    @Value("${chatgpt.api-key}")
    private String secretKey;

    @Bean
    public HttpHeaders httpHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(secretKey);
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("charset", "UTF-8");
        System.setProperty("https.protocols", "TLSv1.2"); //TLS 버전을 맞추기 위함
        return headers;
    }

}
