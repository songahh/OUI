package com.emotionoui.oui.schedule.repository;

import com.emotionoui.oui.schedule.entity.Schedule;
import com.emotionoui.oui.survey.entity.Preference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {

    Optional<Schedule> findByMemberMemberIdAndIsDeleted(Integer memberId, Integer isDeleted);

}
