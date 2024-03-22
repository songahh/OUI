package com.emotionoui.oui.music.service;

import com.emotionoui.oui.music.dto.req.SongReq;

import java.util.List;

public interface MusicService {

    void uploadSongMeta(List<SongReq> songList);
    String searchMusicURI(String artistName, String songName);
}
