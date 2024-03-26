package com.emotionoui.oui.music.controller;

import com.emotionoui.oui.music.dto.req.SongReq;
import com.emotionoui.oui.music.service.MusicService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import se.michaelthelin.spotify.SpotifyApi;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/music")
@Slf4j
public class MusicController {

    private final MusicService musicService;
    private final String success = "success";

    @PostMapping("/upload")
    public String uploadSong(@RequestBody List<SongReq> req){
        musicService.uploadSongMeta(req);
        return success;
    }
}
