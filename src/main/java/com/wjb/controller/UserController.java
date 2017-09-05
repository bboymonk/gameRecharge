package com.wjb.controller;

import com.wjb.component.ShiroKit;
import com.wjb.model.Permission;
import com.wjb.model.User;
import com.wjb.service.PermissionService;
import com.wjb.util.Captcha;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.web.session.HttpServletSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

/**
 * Created by Administrator on 2017/9/1.
 */
@Controller
@RequestMapping("admin")
public class UserController {
    @Autowired
    private PermissionService permissionService;

    @GetMapping("index")
    public String index(){
        return "index";
    }

    @GetMapping("toLogin")
    public String toLogin(){

        List<Permission> list = permissionService.permissionList(1);
        for (Permission permission:list){
            System.out.println(permission.getPermissionname());
        }

        return "login";
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
    public String doLogin(String username, String password,HttpServletRequest request) {
        User user = ShiroKit.getShiroAdmin();
        System.out.println(user.getUsername());

        return "error";

    }
}
