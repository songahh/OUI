package com.emotionoui.oui.schedule.repository;

import com.emotionoui.oui.schedule.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {

    void deleteByScheduleId(Integer id);
}
