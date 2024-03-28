package com.emotionoui.oui.diary.repository;

import com.emotionoui.oui.diary.entity.DailyDiary;
import com.emotionoui.oui.statistics.dto.WeeklyMongoDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface DailyDiaryRepository extends JpaRepository<DailyDiary, Integer> {

    @Query(value = "SELECT new com.emotionoui.oui.statistics.dto.WeeklyMongoDto(d.mongoId,d.dailyDate) " +
            "FROM DailyDiary d " +
            "WHERE d.diary.id = :diaryId AND d.dailyDate BETWEEN :start AND :end")
    List<WeeklyMongoDto> getMongoIdByDiaryId(Integer diaryId, Date start, Date end);

    @Query("SELECT d FROM DailyDiary d WHERE d.diaryId = :diaryId AND d.date = :date + \" 09:00:00.000000\"")
    DailyDiary findByDiaryIdAndDate(@Param("diaryId") Integer diaryId, @Param("date") String date);

}
