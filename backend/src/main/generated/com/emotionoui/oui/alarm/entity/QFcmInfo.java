package com.emotionoui.oui.alarm.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QFcmInfo is a Querydsl query type for FcmInfo
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QFcmInfo extends EntityPathBase<FcmInfo> {

    private static final long serialVersionUID = 1227637812L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QFcmInfo fcmInfo = new QFcmInfo("fcmInfo");

    public final StringPath deviceToken = createString("deviceToken");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final com.emotionoui.oui.member.entity.QMember member;

    public QFcmInfo(String variable) {
        this(FcmInfo.class, forVariable(variable), INITS);
    }

    public QFcmInfo(Path<? extends FcmInfo> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QFcmInfo(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QFcmInfo(PathMetadata metadata, PathInits inits) {
        this(FcmInfo.class, metadata, inits);
    }

    public QFcmInfo(Class<? extends FcmInfo> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.member = inits.isInitialized("member") ? new com.emotionoui.oui.member.entity.QMember(forProperty("member"), inits.get("member")) : null;
    }

}

