package com.emotionoui.oui.survey.controller;


import com.emotionoui.oui.survey.dto.req.PreferenceReq;
import com.emotionoui.oui.survey.entity.Preference;
import com.emotionoui.oui.survey.service.PreferenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/survey")
public class PreferenceController {

    private final PreferenceService preferenceService;

    // 선호 등록
    @PostMapping("/preference")
    public ResponseEntity<?> savePreference(@RequestBody PreferenceReq preferenceReq){
        preferenceService.savePreference(preferenceReq);
        return ResponseEntity.noContent().build();
    }
}
