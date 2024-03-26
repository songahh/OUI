package com.emotionoui.oui.alarm.dto.req;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class AlarmTestReq {
    private String targetToken;
    private String title;
    private String body;
    private String link;
}
