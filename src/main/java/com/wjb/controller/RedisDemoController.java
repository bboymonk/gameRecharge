package com.wjb.controller;

import com.wjb.component.RedisClientTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

/**
 * Created by Administrator on 2017/7/24.
 */
@Controller
public class RedisDemoController {
    @Autowired
    private RedisClientTemplate redisClientTemplate;

    @ResponseBody
    @GetMapping("test")
    public List<String> test(){
        String[] strings = { "操作人","游戏名称", "道具名称", "交易次数","单价","交易总额"};
        List<String> list = Arrays.asList(strings);
        Set<String> set = null;
        List<String> list2 = new ArrayList<>();
        for (int i = 0;i<list.size();i++){
//            redisClientTemplate.lpush("list",list.get(i));
            //有序集合
            redisClientTemplate.zadd("list", (double) i, list.get(i));
        }
        for (int i = 0;i<list.size();i++){
//            list2 = redisClientTemplate.lrange("list", 0, list.size());
            //有序集合
            set = redisClientTemplate.zrangeByScore("list", (long) list.size(), (long) 0);
        }
        Iterator<String> is = set.iterator();
        while (is.hasNext()){
            String next = is.next();
            boolean add = list2.add(next);
        }

        return list2;
    }




}
