package com.emotionoui.oui.calendar.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QEmotion is a Querydsl query type for Emotion
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QEmotion extends EntityPathBase<Emotion> {

    private static final long serialVersionUID = 167191900L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QEmotion emotion1 = new QEmotion("emotion1");

    public final com.emotionoui.oui.diary.entity.QDailyDiary dailyDiary;

    public final DateTimePath<java.util.Date> date = createDateTime("date", java.util.Date.class);

    public final StringPath emotion = createString("emotion");

    public final NumberPath<Integer> emotionId = createNumber("emotionId", Integer.class);

    public final com.emotionoui.oui.member.entity.QMember member;

    public QEmotion(String variable) {
        this(Emotion.class, forVariable(variable), INITS);
    }

    public QEmotion(Path<? extends Emotion> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QEmotion(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QEmotion(PathMetadata metadata, PathInits inits) {
        this(Emotion.class, metadata, inits);
    }

    public QEmotion(Class<? extends Emotion> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.dailyDiary = inits.isInitialized("dailyDiary") ? new com.emotionoui.oui.diary.entity.QDailyDiary(forProperty("dailyDiary"), inits.get("dailyDiary")) : null;
        this.member = inits.isInitialized("member") ? new com.emotionoui.oui.member.entity.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

