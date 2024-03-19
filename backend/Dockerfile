FROM gradle:8.6.0-jdk17 as builder
WORKDIR /build

COPY build.gradle settings.gradle /build/
RUN gradle build -x test --parallel --continue > /dev/null 2>&1 || true

COPY . /build
RUN gradle build -x test --parallel

FROM openjdk:17-ea-4-jdk-slim
WORKDIR /app

COPY --from=builder /build/build/libs/oui-0.0.1-SNAPSHOT.jar .

EXPOSE 8080

USER nobody
ENTRYPOINT [                                                \
   "java",                                                 \
   "-jar",                                                 \
   "-Djava.security.egd=file:/dev/./urandom",              \
   "-Dsun.net.inetaddr.ttl=0",                             \
   "oui-0.0.1-SNAPSHOT.jar"                             \
]
