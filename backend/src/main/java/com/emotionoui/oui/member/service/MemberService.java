package com.emotionoui.oui.member.service;

import com.emotionoui.oui.member.dto.req.FindMemberReq;
import com.emotionoui.oui.member.dto.res.SearchMemberRes;
import com.emotionoui.oui.member.entity.Member;

public interface MemberService {
    String searchMember(String creatorEmail, FindMemberReq findMemberReq);

    SearchMemberRes getMember(Member member);
}
