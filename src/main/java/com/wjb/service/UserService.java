package com.wjb.service;

import com.wjb.base.BaseService;
import com.wjb.model.User;

/**
 * Created by Administrator on 2017/9/1.
 */
public interface UserService extends BaseService<User,Long>{
    User login(String username,String password);
}
