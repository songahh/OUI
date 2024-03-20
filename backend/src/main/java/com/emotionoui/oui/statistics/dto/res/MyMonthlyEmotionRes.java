package com.emotionoui.oui.statistics.dto.res;

import lombok.Builder;

import java.util.List;

@Builder
public class MyMonthlyEmotionRes {

    private List<String> emotions;
}
