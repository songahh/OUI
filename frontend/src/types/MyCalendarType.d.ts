export interface DiaryType {
    memberId: int,
    dailyDiaryId: int,
    date: String,
    emotion: String,
}

export interface ScheduleType {
    scheduleId: int,
    memberId: int,
    title: String,
    content: String,
    date: String,
}

export interface MyCalendarType {
    diaries?: DiaryType[],
    schedules?: ScheduleType[]
}