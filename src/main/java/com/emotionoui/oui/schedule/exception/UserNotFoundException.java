package com.emotionoui.oui.schedule.exception;

public class UserNotFoundException extends ApiException {
    public UserNotFoundException() {
        super(UserErrorCode.USER_NOT_FOUND);
    }
}
