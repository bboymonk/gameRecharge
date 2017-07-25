package com.wjb.controller;

import com.alibaba.druid.util.StringUtils;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.wjb.base.BaseController;
import com.wjb.model.User;
import com.wjb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

/**
 * Created by Administrator on 2017/7/5.
 */
@Controller
public class WjbController extends BaseController{
    @Autowired
    private UserService userService;
    @GetMapping("voice")
    public String ionc(){
        return "voice/voice";
    }

    @GetMapping("navigation")
    public String navigation(){
        return "navigation";
    }

    @GetMapping("index")
    public String test(){
        return "index/index";
    }

    @GetMapping("paging")
    public String paging(){
        return "paging";
    }

    @ResponseBody
    @GetMapping("hello")
    public String hello(Integer pageNum, Integer size, HttpServletRequest request){
        System.out.println(request);
        String ip = request.getHeader("X-Real-IP");
        if (!StringUtils.isEmpty(ip) && !"unknown".equalsIgnoreCase(ip)) {
            return ip;
        }
        ip = request.getHeader("X-Forwarded-For");
        // 多次反向代理后会有多个IP值，第一个为真实IP。
        if (!StringUtils.isEmpty(ip) && !"unknown".equalsIgnoreCase(ip)){
            int index = ip.indexOf(",");
            if (index != -1){
                ip.substring(0,index);
            }else {
                return ip;
            }
        }else{
            return request.getRemoteAddr();
        }
        System.out.println(ip);


        PageHelper.startPage(pageNum == null ? 1 : pageNum,size == null ? 3 : size);
        PageInfo<User> list = userService.all();
        return SUCCESS_FAIL(list.getSize() > 0,list,"error");
    }








}
