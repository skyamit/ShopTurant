package com.shopturant.ShopTurant.cart.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.shopturant.ShopTurant.product.entity.Product;
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
@Table(name = "cart")
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @OneToOne
    @JoinColumn(name = "user", referencedColumnName = "id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    User userId;
    @OneToOne
    @JoinColumn(name = "product", referencedColumnName = "id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    Product productId;
    @Column
    Integer count;
    @Column
    Boolean isActive;
}
