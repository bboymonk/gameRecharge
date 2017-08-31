//package com.wjb.component;
//
//import com.wjb.model.User;
//import org.apache.shiro.authc.AuthenticationException;
//import org.apache.shiro.authc.AuthenticationInfo;
//import org.apache.shiro.authc.AuthenticationToken;
//import org.apache.shiro.authc.SimpleAuthenticationInfo;
//import org.apache.shiro.authz.AuthorizationInfo;
//import org.apache.shiro.authz.SimpleAuthorizationInfo;
//import org.apache.shiro.realm.AuthorizingRealm;
//import org.apache.shiro.subject.PrincipalCollection;
//import org.apache.shiro.subject.SimplePrincipalCollection;
//
//import java.util.HashSet;
//import java.util.Set;
//
///**
// * Created by Useristrator on 2017/7/28.
// */
//public class CustomShiroRealm extends AuthorizingRealm {
//
//    /**
//     * 授权
//     * @param principalCollection
//     * @return
//     */
//    @Override
//    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
//        User admin = (User) principalCollection.getPrimaryPrincipal();
//        Integer uid = admin.getId();
//        List<Role> roleList = roleService.getRoleByUid(uid);
//        List<Resources> resourcesList = resourcesService.getResByUid(uid);
//        Set<String> permissions =new HashSet<String>();
//        Set<String> roles = new HashSet<String>() ;
//        for(Role role:roleList){
//            roles.add(role.getSn());
//        }
//        for(Resources res : resourcesList){
//            permissions.add(res.getUrl());
//        }
//        SimpleAuthorizationInfo simpleAuthenticationInfo = new SimpleAuthorizationInfo();
//        simpleAuthenticationInfo.setRoles(roles);
//        simpleAuthenticationInfo.setStringPermissions(permissions);
//        return simpleAuthenticationInfo;
//    }
//
//    /**
//     * 认证
//     * @param authenticationToken
//     * @return
//     * @throws AuthenticationException
//     */
//    @Override
////    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
////        String username = authenticationToken.getPrincipal().toString();
////        String password = new String((char[]) authenticationToken.getCredentials());
////        User admin = adminService.login(username, ShiroKit.md5(password,username));
////        SimpleAuthenticationInfo info = new SimpleAuthenticationInfo(admin,admin.getPassword(),getName());
////        info.setCredentialsSalt(ByteSource.Util.bytes(admin.getLoginName()));
////        return info;
////    }
//
//    @Override
//    protected void clearCachedAuthorizationInfo(PrincipalCollection principals) {
//        super.clearCachedAuthorizationInfo(principals);
//    }
//
//    @Override
//    protected void clearCachedAuthenticationInfo(PrincipalCollection principals) {
//        User admin = ((User) principals.getPrimaryPrincipal());
//        SimplePrincipalCollection spc = new SimplePrincipalCollection(admin.getLoginName(), getName());
//        super.clearCachedAuthenticationInfo(spc);
//    }
//
//
//
//}
