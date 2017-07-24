package com.wjb.util;

import org.springframework.util.StringUtils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.concurrent.ThreadLocalRandom;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 工具类，验证正则表达式
 * Created by Administrator on 2017/7/24.
 */
public class Utils {
    public static void main(String[] args) {
        String s = "15905813667";
        boolean phone = Utils.isMobile(s);
        System.out.println(phone);
    }
    private static boolean match(String regex, String str) {
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(str);
        return matcher.matches();
    }

    public static boolean isEmail(String str) {
        String regex = "^([\\w-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([\\w-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$";
        return match(regex, str);
    }

    public static boolean isPhone(String str) {
        String regex = "^(\\d{3,4}-)?\\d{6,8}$";
        return match(regex, str);
    }

    public static boolean isUrl(String str) {
        String regex = "http(s)?://([\\w-]+\\.)+[\\w-]+(/[\\w- ./?%&=]*)?";
        return match(regex, str);
    }

    public static boolean isIp(String str) {
        String num = "(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)";
        String regex = "^" + num + "\\." + num + "\\." + num + "\\." + num + "$";
        return match(regex, str);
    }

    public static boolean isMobile(String str) {
        String regex = "^[1](3|4|5|7|8)\\d{9}$";
        return match(regex, str);
    }

    public static boolean isNum(String str) {
        String regex = "^[0-9]*$";
        return match(regex, str);
    }

    /*
     * prefix < 10000
     */
    public static long generateId(String prefix) {
        if (prefix.length() > 4) {
            return -1;
        }

        ThreadLocalRandom random = ThreadLocalRandom.current();
        long pross = (long) (((1 + random.nextInt(9)) + random.nextDouble()) * 10000000);
        String code = String.valueOf(System.nanoTime());
        code = prefix + code.substring(code.length() - 6, code.length()) + String.valueOf(pross);
        return Long.valueOf(code, 10);
    }

    /*
     * Suffix < 10000
     */
    public static Long orderId(String suffix) {
        if (suffix.length() > 4) {
            return -1L;
        }

        ThreadLocalRandom random = ThreadLocalRandom.current();
        Calendar cal = Calendar.getInstance();
        int year = cal.get(Calendar.YEAR) % 100;
        String code = "" + year;
        int month = cal.get(Calendar.MONTH) + 1;
        code += (month < 10) ? "0" + month : "" + month;
        int day = cal.get(Calendar.DAY_OF_MONTH);
        code += (day < 10) ? "0" + day : day;
        long pross1 = (long) (((1 + random.nextInt(9)) + random.nextDouble()) * 1000);
        long pross2 = (long) (((1 + random.nextInt(9)) + random.nextDouble()) * 1000);
        code = String.valueOf(pross1) + String.valueOf(pross2) + code + suffix;

        return Long.valueOf(code, 10);
    }

    public static Long indentId(String suffix) {
        return orderId(suffix);
    }

    public static boolean isDate(String date) {
        if (StringUtils.isEmpty(date)) {
            return false;
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        try {
            sdf.parse(date);
            return true;
        } catch (ParseException e) {

        }

        return false;
    }

    public static boolean isDatetime(String datetime) {
        if (StringUtils.isEmpty(datetime)) {
            return false;
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            sdf.parse(datetime);
            return true;
        } catch (ParseException e) {

        }

        return false;
    }
}
