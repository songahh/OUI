export interface DiaryType {
    memberId: int,
    dailyDiaryId: int,
    date: Date,
    emotion: String,
}

export interface ScheduleType {
    scheduleId: int,
    memberId: int,
    title: String,
    content: String,
    date: Date,
}

export interface MyCalendarType {
    diaries?: DiaryType[],
    schedules?: ScheduleType[]
}