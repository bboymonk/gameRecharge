package com.wjb.component;

import com.wjb.service.PermissionService;
import com.wjb.service.RoleService;
import com.wjb.service.UserService;
import com.wjb.model.Permission;
import com.wjb.model.Role;
import com.wjb.model.User;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.subject.SimplePrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by Useristrator on 2017/7/28.
 */
public class CustomShiroRealm extends AuthorizingRealm {
    @Autowired
    private RoleService roleService;
    @Autowired
    private PermissionService permissionService;
    @Autowired
    private UserService userService;
    /**
     * 授权
     * @param principalCollection
     * @return
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        User admin = (User) principalCollection.getPrimaryPrincipal();
        Integer uid = admin.getId();
        List<Role> roleList = roleService.roleList(uid);
        Set<String> permissions =new HashSet<String>();
        Set<String> roles = new HashSet<String>();
        for(Role role:roleList){
            roles.add(role.getName());
            List<Permission> list = permissionService.permissionList(role.getId());
            for (Permission permission:list){
                permissions.add(permission.getPermissionname());
            }
        }

        SimpleAuthorizationInfo simpleAuthenticationInfo = new SimpleAuthorizationInfo();
        simpleAuthenticationInfo.setRoles(roles);
        simpleAuthenticationInfo.setStringPermissions(permissions);
        return simpleAuthenticationInfo;
    }

    /**
     * 认证
     * @param token
     * @return
     * @throws AuthenticationException
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        String username = token.getPrincipal().toString();
        String password = new String((char[]) token.getCredentials());
        User admin = userService.login(username, ShiroKit.md5(password,username));
        SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(admin,admin.getPassword(),getName());
        info.setCredentialsSalt(ByteSource.Util.bytes(admin.getUsername()));
        return info;
    }

    @Override
    protected void clearCachedAuthorizationInfo(PrincipalCollection principals) {
        super.clearCachedAuthorizationInfo(principals);
    }

    @Override
    protected void clearCachedAuthenticationInfo(PrincipalCollection principals) {
        User admin = ((User) principals.getPrimaryPrincipal());
        SimplePrincipalCollection spc = new SimplePrincipalCollection(admin.getUsername(), getName());
        super.clearCachedAuthenticationInfo(spc);
    }



}
