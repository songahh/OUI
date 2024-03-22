package com.emotionoui.oui.main.service;

import com.emotionoui.oui.main.dto.req.CreateShareDiaryReq;
import com.emotionoui.oui.member.entity.Member;
import se.michaelthelin.spotify.exceptions.detailed.NotFoundException;

public interface MainService {
    void createShareDiary(Member member, CreateShareDiaryReq createShareDiaryReq);
}
