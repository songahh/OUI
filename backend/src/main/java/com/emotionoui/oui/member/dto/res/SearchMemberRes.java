package com.emotionoui.oui.member.dto.res;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class SearchMemberRes {
    private int memberId;
    private String memberEmail;
    private String nickName;
    private String password;
    private String img;
}
