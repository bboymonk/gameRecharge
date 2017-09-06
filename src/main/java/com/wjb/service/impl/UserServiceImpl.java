package com.wjb.service.impl;

import com.wjb.base.BaseMapper;
import com.wjb.base.BaseServiceImpl;
import com.wjb.service.UserService;
import com.wjb.mapper.UserMapper;
import com.wjb.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by Administrator on 2017/9/1.
 */
@Service
public class UserServiceImpl extends BaseServiceImpl<User,Long> implements UserService{
    @Autowired
    private UserMapper userMapper;
    @Override
    public BaseMapper<User, Long> getMapper() {
        return userMapper;
    }

    @Override
    public User login(String username) {
        return userMapper.login(username);
    }
}
