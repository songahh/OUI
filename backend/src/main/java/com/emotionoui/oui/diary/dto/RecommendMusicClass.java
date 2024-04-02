package com.emotionoui.oui.diary.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

@Data
public class RecommendMusicClass {
    @JsonProperty("id")
    private String id;

    @JsonProperty("song_name")
    private String songName;

    @JsonProperty("artist_name_basket")
    private String[] artistNameBasket;

    @JsonProperty("uri")
    private String uri;
}
