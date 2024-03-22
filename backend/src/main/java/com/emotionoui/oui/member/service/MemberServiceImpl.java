package com.emotionoui.oui.member.service;

import com.emotionoui.oui.member.dto.res.SearchMemberRes;
import com.emotionoui.oui.member.entity.Member;
import com.emotionoui.oui.member.exception.DeletedMemberException;
import com.emotionoui.oui.member.exception.NotAddException;
import com.emotionoui.oui.member.exception.NotFoundMemberException;
import com.emotionoui.oui.member.dto.req.FindMemberReq;
import com.emotionoui.oui.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Override
    public String searchMember(String creatorEmail, FindMemberReq findMemberReq) throws NotFoundMemberException{

        String searchMemberEmail= findMemberReq.getMemberEmail();

        // 본인이 본인을 검색할 수는 없음
        if(searchMemberEmail.equals(creatorEmail)){
            throw new NotAddException();
        }

        System.out.println("searchMemberEmail: "+searchMemberEmail);
        // 해당 멤버가 존재하는지 확인, 존재하지 않다면 예외처리
        memberRepository.findByEmail(searchMemberEmail).orElseThrow(NotFoundMemberException::new);

        return searchMemberEmail;
    }

    public SearchMemberRes getMember(Member member){
        // 존재하는지, 탈퇴한 멤버인지 확인
        checkMember(member);
        // 해당 memberEmail에 해당하는 member 반환
        SearchMemberRes searchMemberRes = SearchMemberRes.builder()
                .memberEmail(member.getEmail())
                .memberId(member.getMemberId())
                .img(member.getImg())
                .nickName(member.getNickname())
                .build();

        return searchMemberRes;
    }

    /**
     * 존재하는지, 탈퇴한 멤버인지 확인
     * @param member
     */
    public boolean checkMember(Member member){
        // 존재하는지, 탈퇴한 멤버인지 확인
        memberRepository.findByMemberIdAndIsDeleted(member.getMemberId(),member.getIsDeleted()).orElseThrow(DeletedMemberException::new);
        return true;
    }
}
