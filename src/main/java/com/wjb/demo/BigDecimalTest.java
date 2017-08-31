package com.wjb.demo;

import com.wjb.component.RedisClientTemplate;
import redis.clients.jedis.Jedis;

/**
 * Created by Administrator on 2017/7/16.
 */
public class BigDecimalTest{
    public static void main(String[] args) throws NoSuchFieldException {
        Jedis jedis = new Jedis("192.168.0.80",6379,5000);


        RedisClientTemplate template = new RedisClientTemplate();
        template.set("name","wjb");
        String name = template.get("name");
        System.out.println(name);




    }



}
