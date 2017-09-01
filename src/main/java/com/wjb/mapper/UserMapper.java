package com.wjb.mapper;

import com.wjb.base.BaseMapper;
import com.wjb.model.User;

public interface UserMapper extends BaseMapper<User,Long>{
    User login(String username,String password);
}