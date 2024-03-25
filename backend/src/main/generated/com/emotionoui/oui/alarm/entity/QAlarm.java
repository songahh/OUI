package com.emotionoui.oui.alarm.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QAlarm is a Querydsl query type for Alarm
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAlarm extends EntityPathBase<Alarm> {

    private static final long serialVersionUID = -1428779033L;

    public static final QAlarm alarm = new QAlarm("alarm");

    public final StringPath content = createString("content");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath link = createString("link");

    public final ListPath<com.emotionoui.oui.member.entity.MemberAlarm, com.emotionoui.oui.member.entity.QMemberAlarm> memberAlarmList = this.<com.emotionoui.oui.member.entity.MemberAlarm, com.emotionoui.oui.member.entity.QMemberAlarm>createList("memberAlarmList", com.emotionoui.oui.member.entity.MemberAlarm.class, com.emotionoui.oui.member.entity.QMemberAlarm.class, PathInits.DIRECT2);

    public final StringPath title = createString("title");

    public final EnumPath<AlarmContentType> type = createEnum("type", AlarmContentType.class);

    public QAlarm(String variable) {
        super(Alarm.class, forVariable(variable));
    }

    public QAlarm(Path<? extends Alarm> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAlarm(PathMetadata metadata) {
        super(Alarm.class, metadata);
    }

}

