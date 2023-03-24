package com.shopturant.ShopTurant.transactions.entity;

import com.shopturant.ShopTurant.orders.entity.Orders;
import com.shopturant.ShopTurant.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "transaction")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @OneToOne
    @JoinColumn(name = "user", referencedColumnName = "id")
    User userId;
    @OneToOne
    @JoinColumn(name = "orders", referencedColumnName = "id")
    Orders ordersId;
    @Column
    Integer status;
    @Column
    Date createdAt;
}
