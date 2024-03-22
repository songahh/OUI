package com.emotionoui.oui.music.entity;

import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "MUSIC")
public class MusicCollection {

    @Id
    private ObjectId id;

    private Integer musicId;
    private String albumId;
    private String albumName;
    private List<String> artistId;
    private List<String> artistName;
    private List<String> songGnGnr;
    private String songName;
    private String spotifyUrl;

}
