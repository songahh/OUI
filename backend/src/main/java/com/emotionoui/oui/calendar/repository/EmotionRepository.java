package com.emotionoui.oui.calendar.repository;

import com.emotionoui.oui.calendar.entity.Emotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmotionRepository extends JpaRepository<Emotion, Integer> {

}
