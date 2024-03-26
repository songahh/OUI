package com.emotionoui.oui.statistics.repository;

import com.emotionoui.oui.calendar.entity.Emotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface StatisticsRepository extends JpaRepository<Emotion, Integer> {

    @Query(value = "SELECT e FROM Emotion e join fetch e.dailyDiary d WHERE d.diary.id = :diaryId AND YEAR(e.date) = :year AND MONTH(e.date) = :month")
    List<Emotion> getMyMonth(Integer diaryId, int year, int month);
}
