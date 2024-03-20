package com.emotionoui.oui.music.utils;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.context.annotation.Bean;

import java.util.regex.Pattern;

@Component
public class BeanUtils {

    @Bean
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }

//    @Bean
//    public ObjectMapper objectMapper() { return new ObjectMapper(); }

    @Bean
    public ObjectMapper objectMapper() {
        //    LocalDateTime 타입을 정상적으로 JSON으로 변환하기 위한 설정
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        return mapper;
    }

    @Bean
    @Qualifier("englishFinderPattern")
    public Pattern englishFinderPattern() {
        Pattern pattern = Pattern.compile("[a-zA-Z]");
        return pattern;
    }

    @Bean
    @Qualifier("artistNameFilterPattern")
    public Pattern artistNamefilterPattern(){
        Pattern pattern = Pattern.compile("[()ㄱ-ㅎㅏ-ㅣ가-힣]");
        return pattern;
    }


}
