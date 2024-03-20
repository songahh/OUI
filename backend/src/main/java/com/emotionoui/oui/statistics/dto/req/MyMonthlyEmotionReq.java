package com.emotionoui.oui.statistics.dto.req;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;
import java.time.LocalDate;
import java.time.YearMonth;

@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MyMonthlyEmotionReq {

    private Integer diaryId;

    private YearMonth date;
}