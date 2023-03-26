package com.shopturant.ShopTurant.product.dao;

import com.shopturant.ShopTurant.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductDao extends JpaRepository<Product, Long> {

    @Query(value = "select * from product where is_active = true", nativeQuery = true)
    public List<Product> getAllActiveProducts();

}
