package com.emotionoui.oui.survey.repository;

import com.emotionoui.oui.survey.entity.Preference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PreferenceRepository extends JpaRepository<Preference, Integer> {

}
