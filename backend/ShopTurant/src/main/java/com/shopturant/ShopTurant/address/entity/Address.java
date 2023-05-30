package com.shopturant.ShopTurant.address.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.shopturant.ShopTurant.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @OneToOne
    @JoinColumn(name = "user", referencedColumnName = "id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    User user;
    @Column
    String name;
    @Column
    Long mobileNo;
    @Column
    String email;
    @Column
    String line1;
    @Column
    String line2;
    @Column
    String city;
    @Column
    String state;
    @Column
    String country;
    @Column
    Boolean isActive;
}
