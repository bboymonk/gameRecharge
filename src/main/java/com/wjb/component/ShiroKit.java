package com.wjb.component;

import com.wjb.model.User;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.subject.Subject;

/**
 * Created by Administrator on 2017/7/28.
 */
public class ShiroKit {
    public static String md5(String password,String salt) {
        String p = null;
        p = new Md5Hash(password, salt).toHex();
        return p;
    }

    public static User getShiroAdmin(){
        Subject subject = SecurityUtils.getSubject();
        return  (User) subject.getPrincipal();
    }

    public static void removeShiroSession(){
        Subject subject = SecurityUtils.getSubject();
        subject.getSession().stop();
    }

}
