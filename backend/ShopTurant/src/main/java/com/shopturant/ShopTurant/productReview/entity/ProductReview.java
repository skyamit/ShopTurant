package com.shopturant.ShopTurant.productReview.entity;

import com.shopturant.ShopTurant.product.entity.Product;
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
@Table(name = "product_review")
public class ProductReview {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "product", referencedColumnName = "id")
    Product productId;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user", referencedColumnName = "id")
    User userId;
    @Column
    String title;
    @Column
    Integer rating;
    @Column
    Date createdAt;

}
