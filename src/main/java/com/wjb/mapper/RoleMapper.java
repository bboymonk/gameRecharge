package com.wjb.mapper;

import com.wjb.base.BaseMapper;
import com.wjb.model.Role;

import java.util.List;

public interface RoleMapper extends BaseMapper<Role,Long>{

    List<Role> roleList(Integer uid);
}