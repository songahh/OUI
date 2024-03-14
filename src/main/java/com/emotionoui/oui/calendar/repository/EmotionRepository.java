package com.emotionoui.oui.calendar.repository;


import com.emotionoui.oui.calendar.entity.Emotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface EmotionRepository extends JpaRepository<Emotion, Integer> {

    @Query("SELECT e FROM Emotion e WHERE DATE(e.date)=:date "+
            "AND (e.member.id =: memberId )")
    List<Emotion> findByMyCalendar(@Param("date") LocalDateTime date, @Param("memberId") Integer memberId);

}
