package com.shopturant.ShopTurant.orders.entity;

import com.shopturant.ShopTurant.address.entity.Address;
import com.shopturant.ShopTurant.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Time;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "orders")
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @OneToOne
    @JoinColumn(name = "user", referencedColumnName = "id")
    User userId;
    @OneToOne
    @JoinColumn(name = "address", referencedColumnName = "id")
    Address addressId;
    @Column
    Time orderedAt;
    @Column
    String paymentMode;
    @Column
    Boolean status;
    @Column
    Long cost;
}
