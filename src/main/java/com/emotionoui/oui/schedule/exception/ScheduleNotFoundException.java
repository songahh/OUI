package com.emotionoui.oui.schedule.exception;

public class ScheduleNotFoundException extends ApiException {
    public ScheduleNotFoundException() {
        super(ScheduleErrorCode.POST_NOT_FOUND);
    }
}
