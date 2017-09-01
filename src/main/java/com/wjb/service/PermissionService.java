package com.wjb.service;

import com.wjb.base.BaseService;
import com.wjb.model.Permission;

import java.util.List;

/**
 * Created by Administrator on 2017/9/1.
 */
public interface PermissionService extends BaseService<Permission,Long>{
    List<Permission> permissionList(Integer roleId);
}
