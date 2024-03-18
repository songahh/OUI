package com.emotionoui.oui.auth.redis;

public enum RedisPrefix {
    REFRESH_TOKEN("refreshToken:");

    private String prefix;

    RedisPrefix(String prefix) {
        this.prefix = prefix;
    }
    public String prefix() {
        return prefix;
    }
}