package com.emotionoui.oui.schedule.dto;

import com.emotionoui.oui.calendar.entity.Member;
import com.emotionoui.oui.calendar.entity.Schedule;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ScheduleRequest {

    private int memberId;

    private String title;

    private String content;

    private LocalDateTime date;

    public Schedule toEntity(Member member) {
        return Schedule.builder()
                .member(member)
                .title(title)
                .content(content)
                .date(date)
                .build();
    }
}
