package com.shopturant.ShopTurant.orderItem.dao;

import com.shopturant.ShopTurant.orderItem.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemDao extends JpaRepository<OrderItem, Long> {
}
