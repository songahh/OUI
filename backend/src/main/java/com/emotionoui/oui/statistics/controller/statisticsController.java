package com.emotionoui.oui.statistics.controller;

import com.emotionoui.oui.statistics.dto.req.MyMonthlyEmotionReq;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Slf4j
@RequestMapping("/statistics")
@Controller
@RequiredArgsConstructor
public class statisticsController {

    @GetMapping("/my/month")
    public ResponseEntity<?> getMyMonth(@RequestParam MyMonthlyEmotionReq req){

        System.out.println(req.getMemberId());
        System.out.println(req.getDate());

        return new ResponseEntity(HttpStatus.OK);
    }
}
