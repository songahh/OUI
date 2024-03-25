package com.emotionoui.oui.main.service;

import com.emotionoui.oui.diary.entity.Diary;
import com.emotionoui.oui.diary.repository.DiaryRepository;
import com.emotionoui.oui.main.dto.req.ChangeOrderReq;
import com.emotionoui.oui.main.dto.req.CreateShareDiaryReq;
import com.emotionoui.oui.member.entity.Member;
import com.emotionoui.oui.member.entity.MemberDiary;
import com.emotionoui.oui.member.repository.MemberDiaryRepository;
import com.emotionoui.oui.member.repository.MemberRepository;
import com.emotionoui.oui.querydsl.QuerydslRepositoryCustom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MainServiceImpl implements MainService {

    private final DiaryRepository diaryRepository;
    private final MemberDiaryRepository memberDiaryRepository;
    private final QuerydslRepositoryCustom querydslRepositoryCustom;

    @Override
    public Integer createShareDiary(Member member, CreateShareDiaryReq createShareDiaryReq) {
        // 다이어리 생성
        Diary diary = Diary.builder()
                .name(createShareDiaryReq.getDiaryName())
                .templateId(createShareDiaryReq.getTemplateId())
                .build();
        Diary newDiary = diaryRepository.save(diary);

        // 공유 다이어리를 생성한 사람(member.getMemberId)을 memberDiary DB에 생성
        MemberDiary newMemberDiary = MemberDiary.builder()
                .member(member)
                .diary(newDiary)
                .orders(memberDiaryRepository.countByMemberId(member.getMemberId())+1)
                .build();
        memberDiaryRepository.save(newMemberDiary);

        return newDiary.getId();
    }

    @Override
    public void changeOrder(Integer memberId, List<ChangeOrderReq> orderList) {
        for(int i = 0; i<orderList.size(); i++){
            // orderList를 돌며 해당 diary에 해당 newOrder 넣어주기
            ChangeOrderReq changeOrderReq = orderList.get(i);
            querydslRepositoryCustom.chaneOrderByMemberIdAndDiaryId(memberId, changeOrderReq.getDiaryId(), changeOrderReq.getNewOrder());
        }
    }

}
