package com.emotionoui.oui.member.dto.req;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
public class UpdateMemberReq {
    private String memberNickname;
    private MultipartFile ImgUrl;

    public UpdateMemberReq(String memberNickname, MultipartFile imgUrl) {
        this.memberNickname = memberNickname;
        ImgUrl = imgUrl;
    }
}
