package com.wjb.service.impl;

import com.wjb.base.BaseMapper;
import com.wjb.base.BaseServiceImpl;
import com.wjb.service.PermissionService;
import com.wjb.mapper.PermissionMapper;
import com.wjb.model.Permission;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Administrator on 2017/9/1.
 */
@Service
public class PermissionServiceImpl extends BaseServiceImpl<Permission,Long> implements PermissionService{
    @Autowired
    private PermissionMapper permissionMapper;
    @Override
    public BaseMapper<Permission, Long> getMapper() {
        return permissionMapper;
    }

    @Override
    public List<Permission> permissionList(Integer roleId) {
        return permissionMapper.permissionList(roleId);
    }
}
