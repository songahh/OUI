package com.emotionoui.oui.main.service;

import com.emotionoui.oui.diary.entity.Diary;
import com.emotionoui.oui.diary.repository.DiaryRepository;
import com.emotionoui.oui.main.dto.req.CreateShareDiaryReq;
import com.emotionoui.oui.member.entity.Member;
import com.emotionoui.oui.member.entity.MemberDiary;
import com.emotionoui.oui.member.repository.MemberDiaryRepository;
import com.emotionoui.oui.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MainServiceImpl implements MainService {

    private final DiaryRepository diaryRepository;
    private final MemberDiaryRepository memberDiaryRepository;

    @Override
    public void createShareDiary(Member member, CreateShareDiaryReq createShareDiaryReq) {
        // 다이어리 생성
        Diary newDiary = Diary.builder()
                .name(createShareDiaryReq.getDiaryName())
                .templateId(createShareDiaryReq.getTemplateId())
                .build();
        diaryRepository.save(newDiary);

        // 공유 다이어리를 생성한 사람(member.getMemberId)을 memberDiary DB에 생성
        MemberDiary newMemberDiary = MemberDiary.builder()
                .member(member)
                .diary(newDiary)
                .orders(memberDiaryRepository.countByMemberId(member.getMemberId())+1)
                .build();
        memberDiaryRepository.save(newMemberDiary);
    }

}
