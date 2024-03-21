package com.emotionoui.oui.diary.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QDiaryTemplate is a Querydsl query type for DiaryTemplate
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QDiaryTemplate extends EntityPathBase<DiaryTemplate> {

    private static final long serialVersionUID = -1667886399L;

    public static final QDiaryTemplate diaryTemplate = new QDiaryTemplate("diaryTemplate");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath img = createString("img");

    public QDiaryTemplate(String variable) {
        super(DiaryTemplate.class, forVariable(variable));
    }

    public QDiaryTemplate(Path<? extends DiaryTemplate> path) {
        super(path.getType(), path.getMetadata());
    }

    public QDiaryTemplate(PathMetadata metadata) {
        super(DiaryTemplate.class, metadata);
    }

}

