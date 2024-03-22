package com.emotionoui.oui.member.service;

import com.emotionoui.oui.diary.entity.Diary;
import com.emotionoui.oui.diary.repository.DiaryRepository;
import com.emotionoui.oui.main.dto.req.CreateShareDiaryReq;
import com.emotionoui.oui.member.entity.Member;
import com.emotionoui.oui.member.entity.MemberDiary;
import com.emotionoui.oui.member.exception.NotAddException;
import com.emotionoui.oui.member.exception.NotFoundMemberException;
import com.emotionoui.oui.member.repository.MemberDiaryRepository;
import com.emotionoui.oui.member.dto.req.SearchMemberReq;
import com.emotionoui.oui.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public String searchMember(String creatorEmail, SearchMemberReq searchMemberReq) throws NotFoundMemberException{

        String searchMemberEmail= searchMemberReq.getMemberEmail();

        // 본인이 본인을 검색할 수는 없음
        if(searchMemberEmail.equals(creatorEmail)){
            throw new NotAddException();
        }

        System.out.println("searchMemberEmail: "+searchMemberEmail);
        // 해당 멤버가 존재하는지 확인, 존재하지 않다면 예외처리
        memberRepository.findByEmail(searchMemberEmail).orElseThrow(NotFoundMemberException::new);
        System.out.println(memberRepository.findByEmail(searchMemberEmail));
        // 검색한 멤버가 존재하면 해당 멤버의 이메일을 반환해주고, 아니면 예외처리
        return searchMemberEmail;
    }
}
