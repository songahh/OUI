package com.emotionoui.oui.querydsl;

import com.emotionoui.oui.main.dto.res.SearchDiaryListRes;

import java.util.List;

public interface DiaryRepositoryCustom {

    List<SearchDiaryListRes> findDiariesByMemberId(int memberId);
}
