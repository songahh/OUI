package com.emotionoui.oui.diary.repository;

import com.emotionoui.oui.diary.entity.DailyDiary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface DailyDiaryRepository extends JpaRepository<DailyDiary, Integer> {

}
