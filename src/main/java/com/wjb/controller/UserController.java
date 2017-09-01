package com.wjb.controller;

import com.wjb.util.Captcha;
import org.apache.shiro.web.session.HttpServletSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Created by Administrator on 2017/9/1.
 */
@Controller
@RequestMapping("admin")
public class UserController {

    @GetMapping("toLogin")
    public String toLogin(){
        return "login";
    }
    @GetMapping("index")
    public String index(){
        return "index";
    }
    @GetMapping("getCode")
    public void index(HttpServletResponse response, HttpServletSession session) throws IOException{
        // 设置响应的类型格式为图片格式
        response.setContentType("image/jpeg");
        // 禁止图像缓存。
        response.setHeader("Pragma", "no-cache");
        response.setHeader("Cache-Control", "no-cache");
        response.setDateHeader("Expires", 0);
        Captcha instance = new Captcha();
        session.setAttribute("scaptcha",instance.getCode());
        session.setTimeout(1200);
        instance.write(response.getOutputStream());
    }
    @GetMapping("login")
    public String login(String username, String password, String code, HttpServletRequest request) {
        String scaptcha = (String)request.getSession().getAttribute("scaptcha");
        if (username == "wjb" && password == "123" && scaptcha.equalsIgnoreCase(code)){
            return "success";
        }


        return "error";
    }
}
