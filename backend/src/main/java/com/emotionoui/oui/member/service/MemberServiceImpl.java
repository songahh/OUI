package com.emotionoui.oui.member.service;

import com.emotionoui.oui.member.dto.req.UpdateMemberReq;
import com.emotionoui.oui.member.dto.res.SearchMemberRes;
import com.emotionoui.oui.member.entity.Member;
import com.emotionoui.oui.member.exception.DeletedMemberException;
import com.emotionoui.oui.member.exception.NotAddException;
import com.emotionoui.oui.member.exception.NotFoundMemberException;
import com.emotionoui.oui.member.dto.req.FindMemberReq;
import com.emotionoui.oui.member.exception.NotUpdateMemberException;
import com.emotionoui.oui.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    @Autowired
    private S3Uploader s3Uploader;

    public SearchMemberRes searchMember(Member member){
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

    @Override
    public String findMember(Member member, FindMemberReq findMemberReq) throws NotFoundMemberException{

        String findMemberEmail= findMemberReq.getMemberEmail();
        // 본인이 본인을 검색할 수는 없음
        if(findMemberEmail.equals(member.getEmail())){
            throw new NotAddException();
        }

        System.out.println("searchMemberEmail: "+findMemberEmail);
        // 해당 멤버가 존재하는지 확인, 존재하지 않다면 예외처리

        Member findMember = memberRepository.findByEmail(findMemberEmail).orElseThrow(NotFoundMemberException::new);
        checkMember(findMember);

        return findMemberEmail;
    }

    @Override
    @Transactional
    public void updateMember(Member member, UpdateMemberReq updateMemberReq) {
        // 존재하는지, 탈퇴한 멤버인지 확인
        checkMember(member);

        try{
            // 닉네임 변경
            member.setNickname(updateMemberReq.getMemberNickname());
            // 이미지 변경
            if( updateMemberReq.getImgUrl() != null){
                String storedFileName= s3Uploader.upload(updateMemberReq.getImgUrl(),"imgs");
                member.setImg(storedFileName);
            }
        }catch (Exception e){
            System.out.println("e = " + e);
            throw new NotUpdateMemberException();
        }

        memberRepository.save(member);
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
