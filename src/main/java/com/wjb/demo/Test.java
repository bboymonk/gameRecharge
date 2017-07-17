package com.wjb.demo;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2017/7/11.
 */
public class Test {
    public static void main(String[] args) throws IOException {
        List<String> list = new ArrayList<>();
        List<String> list2 = new ArrayList<>();
        List<String> gameNameList = new ArrayList<>();
        List<String> gameIdList = new ArrayList<>();
        BufferedReader reader = new BufferedReader(new FileReader("C:/Users/Administrator/Desktop/data.json"));
        StringBuffer buffer = new StringBuffer();
        String temp = null;
        while ((temp = reader.readLine()) != null) {
            buffer.append(temp);
        }
        JSONArray jsonArray = JSONArray.parseArray(buffer.toString());
        int size = jsonArray.size();
        for (int i = 0; i < size; i++) {
            JSONObject object = jsonArray.getJSONObject(i);
            String gameName = (String)object.get("游戏名称");
            String gameId = (String)object.get("游戏ID");
            list.add(gameName);
            list2.add(gameId);
        }
        for(int i = 0;i<list.size();i++){
            if (!gameNameList.contains(list.get(i))) {
                gameNameList.add(list.get(i));
            }
        }
        for(int i = 0;i<list2.size();i++){
            if (!gameIdList.contains(list2.get(i))) {
                gameIdList.add(list2.get(i));
            }
        }


    }
}
