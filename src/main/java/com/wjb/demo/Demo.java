package com.wjb.demo;

import com.wjb.model.User;
import org.apache.ibatis.reflection.MetaObject;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.math.BigDecimal;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Stack;

/**
 * Created by Administrator on 2017/7/25.
 */
public class Demo {
    private static void pringInfo(int num){
        //转成二进制
        System.out.println(Integer.toBinaryString(num));
    }
    public static void main(String[] args) {
        /*int num = 10;
        pringInfo(num);
//        左移一位,相当于num*2的1次方，左移N位，相当于num*2的N次方。
        num = num << 4;
        System.out.println(num);
        pringInfo(num);
//        右移与左移相反，除以num*2的N次方。
        num = num >> 3;
        System.out.println(num);
        pringInfo(num);
        int i = 10;
        System.out.println(i >>> 2);


        System.out.println('H'+'a');*/

        try {
            String address = InetAddress.getLocalHost().getHostAddress();
            System.out.println(address);
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }


    }

    public static void showPush(Stack stack,int a){
        stack.push(new Integer(a));
        System.out.println(stack);
    }





}
