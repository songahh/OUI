package com.emotionoui.oui.survey.service;

import com.emotionoui.oui.member.entity.Member;
import com.emotionoui.oui.survey.dto.req.PreferenceReq;
import com.emotionoui.oui.survey.repository.PreferenceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

@Service
@RequiredArgsConstructor
public class PreferenceService {

    private final PreferenceRepository preferenceRepository;

    @Transactional
    public void savePreference(@RequestBody PreferenceReq preferenceReq){
//        Member member = memberRepository.findById(scheduleRequest.getMemberId()).orElseThrow(UserNotFoundException::new);
        Member member = Member.builder().memberId(1).build();

        preferenceRepository.save(preferenceReq.toEntity(
                member, preferenceReq.getType()
        ));
    }
}
