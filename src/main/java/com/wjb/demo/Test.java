package com.wjb.demo;

import com.wjb.model.User;

import java.io.*;

/**
 * Created by Administrator on 2017/7/11.
 */
public class Test {
    public static void main(String[] args) {

    String s = "a  bc def";

        try {
            ObjectInputStream inputStream = new ObjectInputStream(new FileInputStream("F:/user.ser"));
            User user = (User)inputStream.readObject();
            inputStream.close();
            System.out.println(user.getAddress()+"===="+user.getCreatetime());
        } catch (IOException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }


    }
}
