package com.emotionoui.oui.schedule.exception;

import com.emotionoui.oui.common.exception.ApiException;

public class ScheduleNotFoundException extends ApiException {
    public ScheduleNotFoundException() {
        super(ScheduleErrorCode.POST_NOT_FOUND);
    }
}
