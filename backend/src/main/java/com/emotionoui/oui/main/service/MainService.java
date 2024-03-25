package com.emotionoui.oui.main.service;

import com.emotionoui.oui.main.dto.req.ChangeOrderReq;
import com.emotionoui.oui.main.dto.req.CreateShareDiaryReq;
import com.emotionoui.oui.member.entity.Member;
import se.michaelthelin.spotify.exceptions.detailed.NotFoundException;

import java.util.List;

public interface MainService {
    Integer createShareDiary(Member member, CreateShareDiaryReq createShareDiaryReq);

    void changeOrder(Integer memberId, List<ChangeOrderReq> orderList);
}
