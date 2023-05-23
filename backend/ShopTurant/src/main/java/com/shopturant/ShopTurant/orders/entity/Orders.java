package com.shopturant.ShopTurant.orders.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.shopturant.ShopTurant.address.entity.Address;
import com.shopturant.ShopTurant.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;
import java.sql.Time;
import java.time.LocalDateTime;
import java.time.LocalTime;

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
    LocalDateTime orderedAt;
    @Column
    String paymentMode;
    @Column
    Integer status;
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
