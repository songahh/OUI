package com.emotionoui.oui.alarm.entity;

public enum AlarmContentType {
    // Invite: 공유다이어리 초대
    // SystemForcing: 시스템에서 일기 작성 요청하기
    // FriendForcing: 친구가 일기 작성 요청하기(재촉하기)
    // FriendDiary: 친구가 일기 작성하면 알려주기
    Invite, SystemForcing, FriendForcing, FriendDiary
}