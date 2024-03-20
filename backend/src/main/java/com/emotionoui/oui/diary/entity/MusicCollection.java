package com.emotionoui.oui.diary.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Document(collection = "MUSIC")
public class MusicCollection {

    @Id
    private ObjectId id;

    private Integer musicId;

    private List<String> artistName;

    private String songName;

    private String spotifyUrl;
}
