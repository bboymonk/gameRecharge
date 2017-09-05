package com.wjb.mapper;

import com.wjb.base.BaseMapper;
import com.wjb.model.Menu;

import java.util.List;

public interface MenuMapper extends BaseMapper<Menu,Long>{
    List<Menu> rootMenu();
}