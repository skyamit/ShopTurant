package com.shopturant.ShopTurant.controller;

import com.shopturant.ShopTurant.orders.entity.Orders;
import com.shopturant.ShopTurant.orders.service.OrdersService;
import common.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OrderController {
    
    @Autowired
    OrdersService ordersService;
    
    @PostMapping("/orders/save")
    public Response<?> saveOrders(@RequestBody Orders orders) {
        if(!orders.isValid()) {
            return new Response<>("Invalid Request..", 500);
        }

        orders = ordersService.save(orders);
        return new Response<>("Request Submitted..", 200);
    }
    
}
