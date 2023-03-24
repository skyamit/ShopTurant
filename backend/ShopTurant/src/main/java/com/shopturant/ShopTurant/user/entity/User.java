package com.shopturant.ShopTurant.user.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
@Setter
@Entity
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Column
    String name;
    @Column
    Long mobileNo;
    @Column
    String email;
    @Column
    String passwordHash;
    @Column
    Boolean isSeller;
    @Column
    Date registeredAt;
    @Column
    Date lastLogin;
    @Column
    Boolean isActive;


}
