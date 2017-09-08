package com.wjb.controller;

import com.wjb.base.BaseController;
import com.wjb.model.Menu;
import com.wjb.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by Administrator on 2017/9/4.
 */
@Controller
@RequestMapping("menu")
public class MenuController extends BaseController {
    @Autowired
    private MenuService menuService;

    @ResponseBody
    @GetMapping("getMenu")
    public String getMenu(String parentId){
        queryMap.put("parentId",parentId);
        List<Menu> menus = menuService.rootMenu(queryMap);
        return SUCCESS_FAIL(menus!= null,menus,"error");
    }

}
