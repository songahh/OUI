package com.emotionoui.oui.member.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QMemberDiary is a Querydsl query type for MemberDiary
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMemberDiary extends EntityPathBase<MemberDiary> {

    private static final long serialVersionUID = 1858887662L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QMemberDiary memberDiary = new QMemberDiary("memberDiary");

    public final StringPath alarm = createString("alarm");

    public final DateTimePath<java.time.LocalDateTime> create_at = createDateTime("create_at", java.time.LocalDateTime.class);

    public final com.emotionoui.oui.diary.entity.QDiary diary;

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final NumberPath<Integer> isDeleted = createNumber("isDeleted", Integer.class);

    public final QMember member;

    public final NumberPath<Integer> orders = createNumber("orders", Integer.class);

    public QMemberDiary(String variable) {
        this(MemberDiary.class, forVariable(variable), INITS);
    }

    public QMemberDiary(Path<? extends MemberDiary> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QMemberDiary(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QMemberDiary(PathMetadata metadata, PathInits inits) {
        this(MemberDiary.class, metadata, inits);
    }

    public QMemberDiary(Class<? extends MemberDiary> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.diary = inits.isInitialized("diary") ? new com.emotionoui.oui.diary.entity.QDiary(forProperty("diary")) : null;
        this.member = inits.isInitialized("member") ? new QMember(forProperty("member"), inits.get("member")) : null;
    }

}

