package com.emotionoui.oui.common.exception;

import com.emotionoui.oui.common.exception.ApiException;
import com.emotionoui.oui.common.exception.UserErrorCode;

public class UserNotFoundException extends ApiException {
    public UserNotFoundException() {
        super(UserErrorCode.USER_NOT_FOUND);
    }
}
