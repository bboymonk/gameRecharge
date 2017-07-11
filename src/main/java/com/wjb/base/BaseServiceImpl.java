package com.wjb.base;

import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;

/**
 * Created by Administrator on 2017/7/5.
 */
public abstract class BaseServiceImpl<T,ID extends Serializable> implements BaseService<T,ID> {
    public abstract BaseMapper<T,ID> getMapper();

    @Transactional
    public int deleteByPrimaryKey(ID id) {
        return getMapper().deleteByPrimaryKey(id);
    }
    @Transactional
    public int insert(T record) {
        return getMapper().insert(record);
    }
    @Transactional
    public int insertSelective(T record) {
        return getMapper().insertSelective(record);
    }

    public T selectByPrimaryKey(ID id) {
        return getMapper().selectByPrimaryKey(id);
    }
    @Transactional
    public int updateByPrimaryKeySelective(T record) {
        return getMapper().updateByPrimaryKeySelective(record);
    }
    @Transactional
    public int updateByPrimaryKey(T record) {
        return getMapper().updateByPrimaryKey(record);
    }
}
