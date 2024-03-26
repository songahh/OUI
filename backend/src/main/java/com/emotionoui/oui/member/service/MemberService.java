package com.emotionoui.oui.member.service;

import com.emotionoui.oui.member.dto.req.FindMemberReq;
import com.emotionoui.oui.member.dto.req.UpdateMemberReq;
import com.emotionoui.oui.member.dto.res.SearchMemberRes;
import com.emotionoui.oui.member.entity.Member;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {
    SearchMemberRes searchMember(Member member);

    String findMember(String creatorEmail, FindMemberReq findMemberReq);

    void updateMember(Member member, UpdateMemberReq updateMemberReq);
}
