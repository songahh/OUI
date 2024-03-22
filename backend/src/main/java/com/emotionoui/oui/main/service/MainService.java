package com.emotionoui.oui.main.service;

import com.emotionoui.oui.main.dto.req.CreateShareDiaryReq;
import com.emotionoui.oui.main.dto.req.SearchMemberReq;
import com.emotionoui.oui.main.dto.res.SearchDiaryListRes;
import com.emotionoui.oui.member.entity.Member;

import java.util.List;

public interface MainService {
    void createShareDiary(Member member, CreateShareDiaryReq createShareDiaryReq);

    String searchMember(SearchMemberReq searchMemberReq);
}
