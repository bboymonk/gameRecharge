package com.wjb.service;

import com.wjb.base.BaseService;
import com.wjb.model.Menu;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2017/9/4.
 */
public interface MenuService extends BaseService<Menu,Long>{
    List<Menu> rootMenu();
}
