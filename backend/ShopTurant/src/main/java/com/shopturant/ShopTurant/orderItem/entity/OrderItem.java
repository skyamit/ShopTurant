package com.shopturant.ShopTurant.orderItem.entity;

import com.shopturant.ShopTurant.orders.entity.Orders;
import com.shopturant.ShopTurant.product.entity.Product;
import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @OneToMany
    @JoinColumn(name = "order", referencedColumnName = "id")
    Orders orderId;
    @OneToMany
    @JoinColumn(name = "product", referencedColumnName = "id")
    Product productId;
    @Column
    Long count;
}
