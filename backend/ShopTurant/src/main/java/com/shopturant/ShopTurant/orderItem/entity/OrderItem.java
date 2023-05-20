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
@Entity
@Table(name = "orderItem")
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @OneToOne
    @JoinColumn(name = "orders", referencedColumnName = "id")
    Orders orderId;
    @OneToOne
    @JoinColumn(name = "product", referencedColumnName = "id")
    Product productId;
    @Column
    Integer count;
    @Column
    Long price;
}
