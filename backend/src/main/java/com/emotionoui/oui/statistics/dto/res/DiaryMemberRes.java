package com.emotionoui.oui.statistics.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.HashMap;

@Builder
@Getter
@ToString
@AllArgsConstructor
public class DiaryMemberRes {

    private Integer memberId;
    private HashMap<String,Double> emotion;


}
