package com.emotionoui.oui.statistics.dto.req;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MyWeeklyEmotionReq {

    private Integer diaryId;

    private LocalDate date;
}
