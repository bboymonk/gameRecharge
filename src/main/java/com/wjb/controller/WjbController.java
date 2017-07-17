package com.wjb.controller;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.wjb.base.BaseController;
import com.wjb.model.User;
import com.wjb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Created by Administrator on 2017/7/5.
 */
@Controller
public class WjbController extends BaseController{
    @Autowired
    private UserService userService;
    @GetMapping("ionic")
    public String ionc(){
        return "ionic/index";
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
    public String hello(Integer pageNum,Integer size){
        PageHelper.startPage(pageNum == null ? 1 : pageNum,size == null ? 3 : size);
        PageInfo<User> list = userService.all();
        return SUCCESS_FAIL(list.getSize() > 0,list,"error");
    }








}
