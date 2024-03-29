package com.emotionoui.oui.chatgpt.dto.req;

import lombok.*;

@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ChatReq {

    private String role;

    private String content;

    @Builder
    public ChatReq(String role, String content) {
        this.role = role;
        this.content = content;
    }
}
