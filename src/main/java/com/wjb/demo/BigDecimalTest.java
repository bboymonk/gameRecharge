package com.wjb.demo;

import java.math.BigDecimal;

/**
 * Created by Administrator on 2017/7/16.
 */
public class BigDecimalTest {
    public static void main(String[] args) {
        String s = "100.23";
        double a = 100.23;
        BigDecimal decimal = new BigDecimal(a);
        System.out.println(decimal);


    }
}
