package com.emotionoui.oui.music.repository;

import com.emotionoui.oui.music.entity.MusicCollection;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface MusicMongoRepository extends MongoRepository<MusicCollection, String> {

    @Query(value = "{'musicId': ?0}")
    MusicCollection findByMusicId(Integer musicId);

}
