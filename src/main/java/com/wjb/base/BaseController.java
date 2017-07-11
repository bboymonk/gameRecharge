package com.wjb.base;

import com.alibaba.fastjson.JSONObject;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2017/7/6.
 */
public class BaseController {
    private  Map<String,Object> queryMap = new HashMap<>();

    public static String SUCCESS_FAIL(boolean flag,Object success,String error){
        JSONObject json = new JSONObject();
        if (flag){
            json.put("MSG",true);
            json.put("DATA",success);
        }else {
            json.put("MSG",false);
            json.put("DATA",error);
        }
        return json.toString();
    }

}
