package com.wjb.model;

import java.util.Date;
import java.util.List;

public class Menu {
    private Integer id;

    private Integer parentid;

    private String name;

    private String url;

    private Date createtime;

    private Date modifytime;

    private List<Menu> childMenu;

    public List<Menu> getChildMenu() {
        return childMenu;
    }

    public void setChildMenu(List<Menu> childMenu) {
        this.childMenu = childMenu;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getParentid() {
        return parentid;
    }

    public void setParentid(Integer parentid) {
        this.parentid = parentid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url == null ? null : url.trim();
    }

    public Date getCreatetime() {
        return createtime;
    }

    public void setCreatetime(Date createtime) {
        this.createtime = createtime;
    }

    public Date getModifytime() {
        return modifytime;
    }

    public void setModifytime(Date modifytime) {
        this.modifytime = modifytime;
    }
}