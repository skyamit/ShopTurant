package com.shopturant.ShopTurant.productCategory.dao;

import com.shopturant.ShopTurant.productCategory.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ProductCategoryDao extends JpaRepository<ProductCategory,Long> {

    @Query(value = "select * from product_category where product=:product and category=:category", nativeQuery = true)
    public ProductCategory getByProductAndCategory(Long product, Long category);
}
