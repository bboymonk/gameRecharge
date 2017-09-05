package com.wjb.mapper;

import com.wjb.base.BaseMapper;
import com.wjb.model.Permission;

import java.util.List;

public interface PermissionMapper extends BaseMapper<Permission,Long>{

    List<Permission> permissionList(Integer roleId);


}