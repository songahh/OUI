package com.emotionoui.oui.survey.exception;

import com.emotionoui.oui.common.exception.ApiException;

public class PreferenceNotFoundException extends ApiException{

    public PreferenceNotFoundException(){
        super(PreferenceErrorCode.POST_NOT_FOUND);
    }

}
