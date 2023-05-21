package com.shopturant.ShopTurant.orderItem.service;

import com.shopturant.ShopTurant.orderItem.dao.OrderItemDao;
import com.shopturant.ShopTurant.orderItem.entity.OrderItem;
import jakarta.persistence.criteria.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderItemService {

    @Autowired
    OrderItemDao orderItemDao;

    public List<OrderItem> saveAll(List<OrderItem> items) {
        return orderItemDao.saveAll(items);
    }

    public List<OrderItem> getAllByOrderIds(List<Long> orderIds) {
        return orderItemDao.getAllByOrderIds(orderIds);
    }
}
