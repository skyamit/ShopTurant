package com.shopturant.ShopTurant.orderItem.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    Orders orderId;
    @OneToOne
    @JoinColumn(name = "product", referencedColumnName = "id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    Product productId;
    @Column
    Integer count;
    @Column
    Long price;
}
