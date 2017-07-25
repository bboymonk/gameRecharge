package com.wjb.demo;

/**
 * Created by Administrator on 2017/7/25.
 */
public class Demo {
    private static void pringInfo(int num){
        //转成二进制
        System.out.println(Integer.toBinaryString(num));
    }
    public static void main(String[] args) {
        int num = 10;
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


        System.out.println("======");


    }
}
