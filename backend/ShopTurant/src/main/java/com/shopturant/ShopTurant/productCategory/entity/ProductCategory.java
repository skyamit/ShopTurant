package com.shopturant.ShopTurant.productCategory.entity;

import com.shopturant.ShopTurant.category.entity.Category;
import com.shopturant.ShopTurant.product.entity.Product;
import jakarta.persistence.*;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
@Entity
@Table(name = "product_category")
public class ProductCategory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @OneToOne
    @JoinColumn(name = "product", referencedColumnName = "id")
    Product product;

    @OneToOne
    @JoinColumn(name = "category", referencedColumnName = "id")
    Category category;

}
