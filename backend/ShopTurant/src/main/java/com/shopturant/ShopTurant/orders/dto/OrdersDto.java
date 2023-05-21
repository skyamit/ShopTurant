package com.shopturant.ShopTurant.orders.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.shopturant.ShopTurant.orderItem.entity.OrderItem;
import com.shopturant.ShopTurant.orders.entity.Orders;
import lombok.*;

import java.util.List;
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@EqualsAndHashCode
public class OrdersDto {
    List<OrderItem> orderItems;
    Orders orders;
    public OrdersDto(Orders orders, List<OrderItem> orderItems) {
        this.orders = orders;
        this.orderItems = orderItems;
    }
}
