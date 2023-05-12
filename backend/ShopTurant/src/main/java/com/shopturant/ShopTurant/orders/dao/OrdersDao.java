package com.shopturant.ShopTurant.orders.dao;

import com.shopturant.ShopTurant.orders.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrdersDao extends JpaRepository<Orders, Long> {



}
