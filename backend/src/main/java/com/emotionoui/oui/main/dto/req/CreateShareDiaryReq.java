package com.emotionoui.oui.main.dto.req;

import lombok.*;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
public class CreateShareDiaryReq {

    private String diaryName;
    private int templateId;
    private List<String> members;



}
