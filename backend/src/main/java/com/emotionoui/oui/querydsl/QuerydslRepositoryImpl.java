package com.emotionoui.oui.querydsl;

import com.emotionoui.oui.diary.entity.DiaryType;
import com.emotionoui.oui.diary.entity.QDiary;
import com.emotionoui.oui.main.dto.res.SearchDiaryListRes;
import com.emotionoui.oui.member.entity.QMemberAlarm;
import com.emotionoui.oui.member.entity.QMemberDiary;
import com.emotionoui.oui.schedule.entity.QSchedule;
import com.emotionoui.oui.survey.entity.QPreference;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class QuerydslRepositoryImpl implements QuerydslRepositoryCustom {

    private final JPAQueryFactory queryFactory;
    @Autowired
    public QuerydslRepositoryImpl(JPAQueryFactory queryFactory) {
        this.queryFactory = queryFactory;
    }

    // 다이어리 리스트 조회
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
                .where(memberDiary.member.memberId.eq(memberId) // memberId가 주어진 memberId와 일치하고,
                        .and(memberDiary.isDeleted.eq(0))
                        .and(diary.isDeleted.eq(0))) // 삭제처리 되지 않은 행만 조회
                .orderBy(memberDiary.orders.asc()) // orders 컬럼을 기준으로 오름차순 정렬
                .fetch();
    }

    // 회원탈퇴 시 일정 삭제 처리
    @Override
    public void deleteSchedleByMemberId(int memberId) {
        QSchedule schedule = QSchedule.schedule;

        queryFactory
                .update(schedule)
                .set(schedule.isDeleted,1)
                .where(schedule.member.memberId.eq(memberId).and(schedule.isDeleted.eq(0)))
                .execute();
    }

    // 회원탈퇴 시 멤버다이어리 삭제 처리
    @Override
    public void deleteMemberDiaryByMemberId(int memberId) {
        QMemberDiary memberDiary = QMemberDiary.memberDiary;

        queryFactory
                .update(memberDiary)
                .set(memberDiary.isDeleted,1)
                .where(memberDiary.member.memberId.eq(memberId).and(memberDiary.isDeleted.eq(0)))
                .execute();
    }

    // 회원탈퇴 시 알람 삭제 처리
    @Override
    public void deleteAlarmByMemberId(int memberId) {
        QMemberAlarm memberAlarm = QMemberAlarm.memberAlarm;

        queryFactory
                .update(memberAlarm)
                .set(memberAlarm.isDeleted,1)
                .where(memberAlarm.member.memberId.eq(memberId).and(memberAlarm.isDeleted.eq(0)))
                .execute();
    }

    // 회원탈퇴 시 취향 삭제 처리
    @Override
    public void deletePreferenceByMemberId(int memberId) {
        QPreference preference = QPreference.preference;

        queryFactory
                .update(preference)
                .set(preference.isDeleted,1)
                .where(preference.member.memberId.eq(memberId))
                .execute();
    }

    // 회원탈퇴 시 다이어리 삭제 처리
    @Override
    public void deleteDiaryByMemberId(int memberId) {
        QDiary diary =QDiary.diary;
        QMemberDiary memberDiary = QMemberDiary.memberDiary;

        queryFactory
                .update(diary)
                .set(diary.isDeleted,1)
                .where(diary.id.in(
                        JPAExpressions.select(memberDiary.diary.id)
                                .from(memberDiary)
                                .join(memberDiary.diary, diary)
                                .where(memberDiary.member.memberId.eq(memberId)
                                        .and(diary.isDeleted.eq(0))
                                        .and(diary.type.eq(DiaryType.valueOf("개인"))) // 개인다이어리만 탈퇴 처리
                                )
                )
                )
                .execute();

    }

    // 공유 다이어리 나가기
    @Override
    public void exitSharDiaryByMemberIdAndDiaryId(int diaryId, int memberId) {
        QMemberDiary memberDiary = QMemberDiary.memberDiary;

        queryFactory
                .update(memberDiary)
                .set(memberDiary.isDeleted,1)
                .where(memberDiary.diary.id.eq(diaryId)
                        .and(memberDiary.member.memberId.eq(memberId)))
                .execute();
    }

}
