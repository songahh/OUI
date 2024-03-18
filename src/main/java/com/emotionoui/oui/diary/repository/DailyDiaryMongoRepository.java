package com.emotionoui.oui.diary.repository;

import com.emotionoui.oui.diary.entity.DailyDiaryCollection;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DailyDiaryMongoRepository extends MongoRepository<DailyDiaryCollection, String> {

}
