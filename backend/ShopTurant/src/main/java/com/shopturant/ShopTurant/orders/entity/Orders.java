package com.shopturant.ShopTurant.orders.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    User userId;
    @OneToOne
    @JoinColumn(name = "address", referencedColumnName = "id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    Address addressId;
    @Column
    Time orderedAt;
    @Column
    String paymentMode;
    @Column
    Boolean status;
    @Column
    Long cost;

    @Transient
    public boolean isValid() {
        if(userId ==null)
            return false;
        if(addressId == null)
            return false;
        if(orderedAt == null)
            return false;
        if(paymentMode == null)
            return false;
        if(cost == null || cost<=0)
            return false;
        return true;
    }
}
