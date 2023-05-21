package com.shopturant.ShopTurant.orderItem.dao;

import com.shopturant.ShopTurant.orderItem.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface OrderItemDao extends JpaRepository<OrderItem, Long> {
    @Query(value = "select * from order_item where orders in (:orderIds) order by id desc", nativeQuery = true)
    List<OrderItem> getAllByOrderIds(List<Long> orderIds);
}
