package com.shopturant.ShopTurant.orders.service;

import com.shopturant.ShopTurant.orders.dao.OrdersDao;
import com.shopturant.ShopTurant.orders.entity.Orders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrdersService {

    @Autowired
    OrdersDao ordersDao;


    public Orders save(Orders orders) {
        return ordersDao.save(orders);
    }
}
