package com.emotionoui.oui.querydsl;

import com.emotionoui.oui.diary.entity.QDiary;
import com.emotionoui.oui.main.dto.res.SearchDiaryListRes;
import com.emotionoui.oui.member.entity.QMemberDiary;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class DiaryRepositoryImpl implements DiaryRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    @Autowired
    public DiaryRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    @Override
    public List<SearchDiaryListRes> findDiariesByMemberId(int memberId) {
        QMemberDiary memberDiary = QMemberDiary.memberDiary;
        QDiary diary = QDiary.diary; // Q-타입 인스턴스 생성

        return queryFactory
                .select(Projections.constructor(SearchDiaryListRes.class,
                        diary.id.as("diaryId"), // Projections.constructor를 사용할 때, as(" ") 값은 SearchDiaryListRes 클래스 생성자 파라미터 이름과 일치해야 함
                        diary.name.as("diaryName"),
                        diary.templateId.as("templateId"),
                        memberDiary.member.memberId.as("memberId"),
                        diary.type.as("diaryType"),
                        diary.createdAt.as("createdAt"),
                        memberDiary.orders.as("orders")
                ))
                .from(memberDiary) // memberDiary 테이블을 기준으로 조회
                .join(memberDiary.diary, diary) // memberDiary와 diary를 조인(memberDiary.diary는 memberDiary 테이블과 diary 테이블을 연결하는 외래키)
                .where(memberDiary.member.memberId.eq(memberId)) // memberId가 주어진 memberId와 일치하는 행만 조회
                .orderBy(memberDiary.orders.asc()) // orders 컬럼을 기준으로 오름차순 정렬
                .fetch();
    }
}
