package com.emotionoui.oui.statistics.dto;

import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class WeeklyMongoDto implements Comparable<WeeklyMongoDto> {

    private String mongoId;
    private Date date;

    @Override
    public int compareTo(WeeklyMongoDto o) {
        return this.getDate().compareTo(o.getDate());
    }
}