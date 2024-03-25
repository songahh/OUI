package com.emotionoui.oui.main.dto.req;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class ChangeOrderReq {

    private int diaryId;
    private int newOrder;

}
