package com.emotionoui.oui.alarm.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class TestDto {
    private List<String> members;
    private Integer diaryId;
    private String createrNickname;
}