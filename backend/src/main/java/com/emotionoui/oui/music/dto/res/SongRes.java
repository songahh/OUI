package com.emotionoui.oui.music.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class SongRes {
    private ObjectId id;
    private Integer musicId;
    private List<String> artistName;
    private String songName;
    private String spotifyUrl;
}
