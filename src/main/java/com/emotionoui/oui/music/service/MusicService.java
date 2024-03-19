package com.emotionoui.oui.music.service;

import com.fasterxml.jackson.core.JsonProcessingException;

public interface MusicService {

    String searchMusicByArtistNameAndSongName(String artistName, String songName) throws JsonProcessingException;
}
