package com.shopturant.ShopTurant.orders.service;

import com.shopturant.ShopTurant.orders.dao.OrdersDao;
import com.shopturant.ShopTurant.orders.entity.Orders;
import common.Constants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrdersService {

    @Autowired
    OrdersDao ordersDao;


    public Orders save(Orders orders) {
        return ordersDao.save(orders);
    }
    public List<Orders> saveAll(List<Orders> order) {
        return ordersDao.saveAll(order);
    }
    public List<Orders> getOrdersByUserId(Long userId) {
        return ordersDao.getOrdersByUserId(userId);
    }

    public boolean cancelOrder(Long orderId) {
        Orders orders = ordersDao.getReferenceById(orderId);
        if(orders == null)
            return false;
        orders.setStatus(Constants.ORDER_STATUS_CANCELLED);
        ordersDao.saveAndFlush(orders);
        return true;
    }
}
