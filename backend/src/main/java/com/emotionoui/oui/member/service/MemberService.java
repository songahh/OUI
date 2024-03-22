package com.emotionoui.oui.member.service;

import com.emotionoui.oui.member.dto.req.SearchMemberReq;

public interface MemberService {
    String searchMember(String creatorEmail, SearchMemberReq searchMemberReq);
}
