package com.wjb.component;

import com.sun.tools.doclets.formats.html.SourceToHTMLConverter;
import com.wjb.model.User;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.crypto.RandomNumberGenerator;
import org.apache.shiro.crypto.SecureRandomNumberGenerator;
import org.apache.shiro.crypto.hash.Md5Hash;
import org.apache.shiro.crypto.hash.SimpleHash;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.util.ByteSource;

/**
 * Created by Administrator on 2017/7/28.
 */
public class ShiroKit {

    public static String md5(User user) {
        String salt = new SecureRandomNumberGenerator().nextBytes().toHex();
        user.setSalt(salt);
        System.out.println("salt====="+salt);
        String newPassword = new SimpleHash("MD5",user.getPassword(),salt,2).toString();
        return newPassword;
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
