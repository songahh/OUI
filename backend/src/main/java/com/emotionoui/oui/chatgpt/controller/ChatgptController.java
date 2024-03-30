//package com.emotionoui.oui.chatgpt.controller;
//
//import com.emotionoui.oui.chatgpt.dto.ChatCompletion;
//import com.emotionoui.oui.chatgpt.service.ChatgptService;
//import jakarta.transaction.Transactional;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.Map;
//
//@Slf4j
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/gpt")
//public class ChatgptController {
//
//    private final ChatgptService chatgptService;
//
//    /**
//     * [API] 최신 ChatGPT 프롬프트 명령어를 수행합니다. : gpt-4, gpt-4 turbo, gpt-3.5-turbo
//     *
//     * @param chatCompletion
//     * @return
//     */
////    @Transactional
//    @PostMapping
//    public ResponseEntity<Map<String, Object>> selectPrompt(@RequestBody ChatCompletion chatCompletion) {
//        log.debug("param :: " + chatCompletion.toString());
//        Map<String, Object> result = chatgptService.prompt(chatCompletion);
//        return new ResponseEntity<>(result, HttpStatus.OK);
//    }
//
//}
