package com.emotionoui.oui.schedule.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ScheduleErrorCode implements ErrorCode {

    POST_NOT_FOUND(HttpStatus.NOT_FOUND, "Post is not found"),
    DELETE_POST_FAILED(HttpStatus.BAD_REQUEST, "Failed to delete the post")
    ;

    private final HttpStatus httpStatus;
    private final String message;
}