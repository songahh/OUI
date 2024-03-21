package com.emotionoui.oui.diary.dto.req;

import com.emotionoui.oui.member.entity.Member;

import java.util.List;

public class updateDiarySettingReq {
    // 다이어리 이름
    private String name;
    // 템플릿 종류
    private Integer templateId;
    // 알람 ON/OFF 설정 상태
    private String alarm;
    // 공용다이어리에서의 멤버
    private List<Integer> memberList;
}
