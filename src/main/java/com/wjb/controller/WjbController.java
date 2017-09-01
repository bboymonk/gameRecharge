package com.wjb.controller;

import com.wjb.base.BaseController;
import com.wjb.service.UserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Created by Administrator on 2017/7/5.
 */
@Controller
public class WjbController extends BaseController{
    private static final Logger logger = Logger.getLogger(WjbController.class);
    @Autowired
    private UserService userService;
    @GetMapping("voice")
    public String ionc(){
        return "voice/voice";
    }
    @GetMapping("abc")
    public String abc(){
        return "abc";
    }

    @GetMapping("navigation")
    public String navigation(){
        return "navigation";
    }

    @GetMapping("index")
    public String test(){
        return "ionic/index";
    }
    @GetMapping("category")
    public String category(){
        return "ionic/category";
    }

    @GetMapping("paging")
    public String paging(){
        return "paging";
    }

//    @ResponseBody
//    @GetMapping("hello")
//    public String hello(Integer pageNum, Integer size, HttpServletRequest request){
//        /*System.out.println(request);
//        String ip = request.getHeader("X-Real-IP");
//        if (!StringUtils.isEmpty(ip) && !"unknown".equalsIgnoreCase(ip)) {
//            return ip;
//        }
//        ip = request.getHeader("X-Forwarded-For");
//        // 多次反向代理后会有多个IP值，第一个为真实IP。
//        if (!StringUtils.isEmpty(ip) && !"unknown".equalsIgnoreCase(ip)){
//            int index = ip.indexOf(",");
//            if (index != -1){
//                ip.substring(0,index);
//            }else {
//                return ip;
//            }
//        }else{
//            return request.getRemoteAddr();
//        }
//        System.out.println(ip);*/
//
//
//        PageHelper.startPage(pageNum == null ? 1 : pageNum,size == null ? 3 : size);
//        PageInfo<User> list = userService.all();
//        logger.info("分页查询"+list);
//        return SUCCESS_FAIL(list.getSize() > 0,list,"error");
//    }








}
