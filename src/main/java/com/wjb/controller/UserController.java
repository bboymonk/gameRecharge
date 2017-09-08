package com.wjb.controller;

import com.alibaba.druid.util.StringUtils;
import com.wjb.base.BaseController;
import com.wjb.component.ShiroKit;
import com.wjb.model.User;
import com.wjb.service.PermissionService;
import com.wjb.service.UserService;
import com.wjb.util.Captcha;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.apache.shiro.web.session.HttpServletSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * Created by Administrator on 2017/9/1.
 */
@Controller
@RequestMapping("admin")
public class UserController extends BaseController{
    @Autowired
    private PermissionService permissionService;
    @Autowired
    private UserService userService;

    @GetMapping("left")
    public String left(){
        return "left";
    }

    @GetMapping("index")
    public String index(){
        return "index";
    }

    @GetMapping("toLogin")
    public String toLogin(){
        return "login";
    }

    @GetMapping("error")
    public String error(){
        return "error";
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

    @ResponseBody
    @RequestMapping(value = "login",method = RequestMethod.POST)
    public String doLogin(User user,HttpSession session) {
        User admin = (User)ShiroKit.getShiroAdmin();
        if (admin != null){
            return SUCCESS_FAIL(false,null,"您已登录");
        }
        if (StringUtils.isEmpty(user.getUsername()) || StringUtils.isEmpty(user.getPassword())){
            return SUCCESS_FAIL(false,null,"用户名密码不能为空");
        }
        String message = null;
        UsernamePasswordToken token = new UsernamePasswordToken(user.getUsername(), user.getPassword());
        Subject subject = SecurityUtils.getSubject();
        try {
            subject.login(token);
        } catch (AuthenticationException e) {
            message = e.getMessage();
        }
        if (StringUtils.isEmpty(message)){
            return SUCCESS_FAIL(true,"登录成功",null);
        }else {
            return SUCCESS_FAIL(false,null,"认证失败");
        }


    }
    @ResponseBody
    @GetMapping("add")
    public String add(User user){
        String newPassword = ShiroKit.md5(user.getPassword(), user.getUsername());
        user.setPassword(newPassword);
        int i = userService.insertSelective(user);
        return String.valueOf(i);
    }



}
