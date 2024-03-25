package com.emotionoui.oui.querydsl;

import com.emotionoui.oui.main.dto.res.SearchDiaryListRes;

import java.util.List;

public interface QuerydslRepositoryCustom {

    List<SearchDiaryListRes> findDiariesByMemberId(int memberId);

    void deleteSchedleByMemberId(int memberId);

    void deleteMemberDiaryByMemberId(int memberId);

    void deleteAlarmByMemberId(int memberId);

    void deletePreferenceByMemberId(int memberId);

    void deleteDiaryByMemberId(int memberId);
}
