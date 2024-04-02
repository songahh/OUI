package com.emotionoui.oui.music.entity;

import com.emotionoui.oui.diary.dto.EmotionClass;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "song_meta")
public class SongMetaCollection {

    @Id
    @Field("_id")
    private ObjectId objectId;

    private String id;
    private String lyrics;

    @Field("song_name")
    private String songName;

    private String album_id;
    @Field("album_name")
    private String albumName;
    @Field("artist_id_basket")
    private List<Integer> artistIdBasket;
    @Field("artist_name_basket")
    private List<String> artistNameBasket;

    @Field("song_gn_dtl_gnr_basket")
    private List<String> songGnDtlGnrBasket;

    @Field("uri")
    private String youtubeUrl;

    private EmotionClass score;

    public void setYoutubeUrl(String url){
        this.youtubeUrl = url;
    }

}
