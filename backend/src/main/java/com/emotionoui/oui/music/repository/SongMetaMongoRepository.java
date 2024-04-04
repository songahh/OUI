package com.emotionoui.oui.music.repository;

import com.emotionoui.oui.music.entity.MusicCollection;
import com.emotionoui.oui.music.entity.SongMetaCollection;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SongMetaMongoRepository extends MongoRepository<SongMetaCollection, String> {

    @Query(value = "{'id': ?0}")
    SongMetaCollection findByMusicId(String musicId);

}
