package com.emotionoui.oui.main.dto.req;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@Builder
public class CreateShareDiaryReq {

    private int diaryId;
    private String diaryName;
    private int templateId;
    private List<Integer> memberIds;

}
