package com.emotionoui.oui.statistics.dto.req;

import lombok.AccessLevel;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class StatisticsReq {

    private Integer diaryId;

    private LocalDate date;
}
