package com.emotionoui.oui.music.service;

import com.fasterxml.jackson.core.JsonProcessingException;

public interface MusicService {

    String searchMusicURI(String artistName, String songName);
}
