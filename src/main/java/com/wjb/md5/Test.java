package com.wjb.md5;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * Created by Administrator on 2017/7/4.
 */
public class Test {
    public static void main(String[] args) {
        try {
            MessageDigest md5 = MessageDigest.getInstance("MD5");
            byte[] data = new byte[10];
            data[0]='1';
            data[1]='2';
            data[2]='3';
            System.out.println(data);
            md5.update(data);
            byte[] bytes = md5.digest();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
    }
}
