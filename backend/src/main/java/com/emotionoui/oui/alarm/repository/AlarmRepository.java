package com.emotionoui.oui.alarm.repository;

import com.emotionoui.oui.alarm.entity.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlarmRepository extends JpaRepository<Alarm, Integer> {

}
