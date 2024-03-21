package com.emotionoui.oui.calendar.repository;


import com.emotionoui.oui.calendar.entity.Emotion;
import com.emotionoui.oui.schedule.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CalendarRepository extends JpaRepository<Emotion, Integer> {

    // 일기 찾기
    @Query("SELECT e FROM Emotion e WHERE e.member.memberId = :memberId AND YEAR(e.date) = :year AND MONTH(e.date) =:month ORDER BY e.date")
    List<Emotion> findMyDiarybyDate(Integer memberId, Integer year, Integer month);


    // 일정 찾기
    @Query("SELECT s FROM Schedule s WHERE s.member.memberId = :memberId AND YEAR(s.date) = :year AND MONTH(s.date) =:month AND s.isDeleted = 0 ORDER BY s.date")
    List<Schedule> findMySchedulebyDate(Integer memberId, Integer year, Integer month);

}
