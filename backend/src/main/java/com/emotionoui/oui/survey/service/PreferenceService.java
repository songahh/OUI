package com.emotionoui.oui.survey.service;

import com.emotionoui.oui.member.entity.Member;
import com.emotionoui.oui.member.repository.MemberRepository;
import com.emotionoui.oui.survey.dto.req.PreferenceReq;
import com.emotionoui.oui.survey.entity.Preference;
import com.emotionoui.oui.survey.entity.PreferenceType;
import com.emotionoui.oui.survey.repository.PreferenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class PreferenceService {

    private final PreferenceRepository preferenceRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public void savePreference(Member member, PreferenceReq preferenceReq){
        PreferenceType preferenceType;
        if(Objects.equals(preferenceReq.getType(), "표현")){
            preferenceType = PreferenceType.Blue;
        }else{
            preferenceType = PreferenceType.Yellow;
        }
        Preference preference = Preference.builder()
                .member(member)
                .type(preferenceType)
                .isDeleted(0)
                .build();
        preferenceRepository.save(preference);
    }

    public boolean isExisted(Member member){
        return preferenceRepository.existsByMemberMemberIdAndIsDeleted(member.getMemberId(),0);
    }

    public String getTypeByMemberId(Member member){
        return preferenceRepository.getTypeByMemberId(member.getMemberId());
    }

    public void updatePreferenceByMemberId(Integer memberId, String type){
        Preference preference = preferenceRepository.getPreferenceByMemberId(memberId);
        preference.setIsDeleted(1);
        preferenceRepository.save(preference);

        Member member = memberRepository.findById(memberId).orElseThrow(IllegalArgumentException::new);

        Preference newPreference = Preference.builder()
                .member(member)
                .type(PreferenceType.valueOf(type))
                .isDeleted(0)
                .build();

        preferenceRepository.save(newPreference);
    }
}
