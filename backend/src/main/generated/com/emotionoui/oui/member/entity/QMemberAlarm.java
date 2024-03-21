package com.emotionoui.oui.member.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMemberAlarm is a Querydsl query type for MemberAlarm
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemberAlarm extends EntityPathBase<MemberAlarm> {

    private static final long serialVersionUID = 1856206460L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMemberAlarm memberAlarm = new QMemberAlarm("memberAlarm");

    public final com.emotionoui.oui.alarm.entity.QAlarm alarm;

    public final DateTimePath<java.time.LocalDateTime> created_at = createDateTime("created_at", java.time.LocalDateTime.class);

    public final com.emotionoui.oui.diary.entity.QDiary diary;

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final NumberPath<Integer> isDeleted = createNumber("isDeleted", Integer.class);

    public final QMember member;

    public QMemberAlarm(String variable) {
        this(MemberAlarm.class, forVariable(variable), INITS);
    }

    public QMemberAlarm(Path<? extends MemberAlarm> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMemberAlarm(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMemberAlarm(PathMetadata metadata, PathInits inits) {
        this(MemberAlarm.class, metadata, inits);
    }

    public QMemberAlarm(Class<? extends MemberAlarm> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.alarm = inits.isInitialized("alarm") ? new com.emotionoui.oui.alarm.entity.QAlarm(forProperty("alarm")) : null;
        this.diary = inits.isInitialized("diary") ? new com.emotionoui.oui.diary.entity.QDiary(forProperty("diary")) : null;
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member"), inits.get("member")) : null;
    }

}

