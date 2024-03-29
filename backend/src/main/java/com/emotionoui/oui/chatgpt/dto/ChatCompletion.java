package com.emotionoui.oui.chatgpt.dto;

import com.emotionoui.oui.chatgpt.dto.req.ChatReq;
import lombok.*;

import java.util.List;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatCompletion {
    // 사용할 모델
    private String model;

    private List<ChatReq> messages;

    @Builder
    public ChatCompletion(String model, List<ChatReq> messages) {
        this.model = model;
        this.messages = messages;
    }
}
