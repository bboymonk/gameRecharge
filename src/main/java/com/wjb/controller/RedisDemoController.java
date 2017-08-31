package com.wjb.controller;

import com.wjb.component.RedisClientTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by Administrator on 2017/7/24.
 */
@Controller
public class RedisDemoController {
    @Autowired
    private RedisClientTemplate redisClientTemplate;

    @ResponseBody
    @GetMapping("test")
    public String test(){
        redisClientTemplate.set("name","wjb");
        String name = redisClientTemplate.get("name");
        return name;
    }




}
