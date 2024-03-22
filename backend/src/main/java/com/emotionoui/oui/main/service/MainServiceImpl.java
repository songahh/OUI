package com.emotionoui.oui.main.service;

import com.emotionoui.oui.main.dto.res.SearchDiaryListRes;
import com.emotionoui.oui.member.entity.Member;
import com.emotionoui.oui.querydsl.DiaryRepositoryCustom;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
@Service
@RequiredArgsConstructor
public class MainServiceImpl implements MainService {

}
