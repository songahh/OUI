package com.emotionoui.oui.calendar.repository;


import com.emotionoui.oui.calendar.dto.CalendarDto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface CalendarRepository extends JpaRepository<LocalDateTime, Integer> {

    @Query("SELECT e FROM Emotion e WHERE DATE(e.date)=:date "+
            "AND (e.member.id =: memberId )")
    CalendarDto findByMyCalendar(@Param("date") LocalDateTime date, @Param("memberId") String memberId);

}
