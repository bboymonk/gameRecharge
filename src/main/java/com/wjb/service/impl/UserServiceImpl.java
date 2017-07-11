package com.wjb.service.impl;

import com.github.pagehelper.PageInfo;
import com.wjb.base.BaseMapper;
import com.wjb.base.BaseServiceImpl;
import com.wjb.mapper.UserMapper;
import com.wjb.model.User;
import com.wjb.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2017/7/5.
 */
@Service
public class UserServiceImpl extends BaseServiceImpl<User,Long> implements UserService {
    @Autowired
    private UserMapper userMapper;
    @Override
    public BaseMapper getMapper() {
        return userMapper;
    }

//    @Override
//    public List<User> all() {
//        return userMapper.getAll();
//    }


    @Override
    public PageInfo<User> all() {
        List<User> list = userMapper.getAll();
        return new PageInfo<User>(list);
    }
}
