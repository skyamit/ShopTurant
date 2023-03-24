package com.shopturant.ShopTurant.product.entity;

import com.shopturant.ShopTurant.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
@Setter
@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user", referencedColumnName = "id")
    User userId;
    @Column
    String title;
    @Column
    String summary;
    @Column
    String type;
    @Column
    Long price;
    @Column
    Integer discount;
    @Column
    Date createdAt;
    @Column
    String imageId;
    @Column
    Boolean isActive;
}
