package com.emotionoui.oui.schedule.repository;

import com.emotionoui.oui.calendar.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;



@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {

    Schedule findByScheduleId(Integer memberId);
}
