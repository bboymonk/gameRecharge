package com.wjb.controller;

import com.wjb.component.RedisClientTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Created by Administrator on 2017/7/24.
 */
@Controller
public class RedisDemoController {
    @Autowired
    private RedisClientTemplate redisClientTemplate;

    @GetMapping("test")
    public String test(){
        return null;
    }




}
