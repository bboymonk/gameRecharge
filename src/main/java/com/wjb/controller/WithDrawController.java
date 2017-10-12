/*
package com.apply.controller.withdraw;

import com.apply.base.BaseController;
import com.apply.model.TAsset;
import com.apply.model.TUserBill;
import com.apply.model.withdraw.WithDraw;
import com.apply.service.SysUserService;
import com.apply.service.UserBillService;
import com.apply.service.UserService;
import com.apply.service.withdraw.WithDrawService;
import com.apply.shiro.ShiroUser;
import com.apply.utils.SimpleResult;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.math.BigDecimal;
import java.util.Date;

*/
/**
 * Created by Administrator on 2017/10/11.
 *//*

@Controller
@RequestMapping("withdraw")
public class WithDrawController extends BaseController{

    @Autowired
    private WithDrawService withDrawService;
    @Autowired
    private UserService userService;
    @Autowired
    private UserBillService userBillService;
    @Autowired
    private SysUserService sysUserService;

    @GetMapping("list")
    public String draw(){
        return "withdraw/withdraw";
    }

    @ResponseBody
    @GetMapping("search")
    public SimpleResult list(Integer pageNum,Integer size,String startDate, String endDate){
        PageHelper.startPage(pageNum == null ? 1 : pageNum,size == null ? 3 : size);
        PageInfo<WithDraw> info = null;
        try {
            info = withDrawService.list();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new SimpleResult(info);
    }

    */
/**
     * 提现审核
     * @param withDraw
     * @return
     *//*

    @ResponseBody
    @GetMapping("doIt")
    public SimpleResult doIt(WithDraw withDraw){
        ShiroUser user = getUser();
        //美元汇率换算
        if (withDraw.getCountryId() == 2){
            BigDecimal newBalance = withDraw.getAmount().multiply(new BigDecimal(6.5896));
            withDraw.setAmount(newBalance);
        }
        if (withDraw.getAmount().doubleValue() > 50000 && user.getRoleId() != 2){
            return new SimpleResult(1,"大于5万元需主管以上权限审核");
        }
        //查询用户余额
        TAsset balance = null;
        try {
            balance = userService.getBalance(withDraw.getUserId(), withDraw.getCountryId());
            if (balance.getBalance().doubleValue() < withDraw.getAmount().doubleValue()){
                return new SimpleResult(2,"帐户余额不足");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new SimpleResult(-1,"查询余额异常");
        }
        withDraw.setStatus(2);
        withDraw.setRemark("审核通过");
        withDraw.setOperator(user.getId());
        withDraw.setModifyTime(new Date());
        //主管审核
        if (withDraw.getAmount().doubleValue() > 50000 && user.getRoleId() == 2){
            Integer i = withDrawService.masterDoIt(withDraw);
            if (i > 0){
                //插入一账单记录
                TUserBill bill = new TUserBill();
                bill.setUserId(withDraw.getUserId());
                bill.setAmount(withDraw.getAmount());
                bill.setBalance(balance.getBalance().subtract(withDraw.getAmount()));
                bill.setCurrencyId(withDraw.getCountryId());
                bill.setType(0);
                bill.setCreateTime(new Date());
                userBillService.addBill(bill);
                return new SimpleResult(0,"审核通过");
            }
            return new SimpleResult(3,"更新提现记录异常");
        }
        //财务审核
        Integer i = withDrawService.masterDoIt(withDraw);
        if (i > 0){
            //插入一账单记录
            TUserBill bill = new TUserBill();
            bill.setUserId(withDraw.getUserId());
            bill.setAmount(withDraw.getAmount());
            bill.setBalance(balance.getBalance().subtract(withDraw.getAmount()));
            bill.setCurrencyId(withDraw.getCountryId());
            bill.setType(0);
            bill.setCreateTime(new Date());
            userBillService.addBill(bill);
            return new SimpleResult(0,"审核通过");
        }
        return new SimpleResult(3,"更新提现记录异常");
    }




}
*/
