package com.emotionoui.oui.diary.repository;

import com.emotionoui.oui.diary.dto.EmotionClass;
import com.emotionoui.oui.diary.entity.DailyDiaryCollection;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DailyDiaryMongoRepository extends MongoRepository<DailyDiaryCollection, String> {


    @Query(value = "{'_id': ?0}", fields = "{'emotion': 1}")
    DailyDiaryCollection getEmotion(String dailyId);
}
