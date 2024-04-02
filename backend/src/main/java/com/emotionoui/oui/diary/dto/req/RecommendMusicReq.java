package com.emotionoui.oui.diary.dto.req;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RecommendMusicReq {
    private double angry;
    private double embarrassed;
    private double sad;
    private double happy;
    private double doubtful;
    private double comfortable;
    private String user_type;
}
