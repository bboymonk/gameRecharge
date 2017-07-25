package com.wjb.mapper;

import com.wjb.base.BaseMapper;
import com.wjb.model.User;

import java.util.List;

public interface UserMapper extends BaseMapper<User,Integer>{

    List<User> getAll();

}