package com.shopturant.ShopTurant.orders.dao;

import com.shopturant.ShopTurant.orders.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrdersDao extends JpaRepository<Orders, Long> {
    @Query(value = "select * from orders where user = :userId order by id desc", nativeQuery = true)
    List<Orders> getOrdersByUserId(Long userId);
}
