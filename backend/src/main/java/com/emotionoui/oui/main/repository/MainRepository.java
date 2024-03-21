package com.emotionoui.oui.main.repository;

import com.emotionoui.oui.member.entity.MemberDiary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MainRepository extends JpaRepository<MemberDiary, Integer> {
}
