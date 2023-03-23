package com.shopturant.ShopTurant.cart.entity;

import com.shopturant.ShopTurant.product.entity.Product;
import com.shopturant.ShopTurant.aauser.entity.User;
import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @OneToOne
    @JoinColumn(name = "user", referencedColumnName = "id")
    User userId;
    @OneToOne
    @JoinColumn(name = "product", referencedColumnName = "id")
    Product productId;
    @Column
    Boolean isActive;
}
