package com.wjb.service;

import com.github.pagehelper.PageInfo;
import com.wjb.base.BaseService;
import com.wjb.model.User;

import java.util.List;

/**
 * Created by Administrator on 2017/7/5.
 */
public interface UserService extends BaseService<User,Long> {
    PageInfo<User> all();
//      List<User> all();
}
