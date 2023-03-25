package com.shopturant.ShopTurant.product.dao;

import com.shopturant.ShopTurant.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductDao extends JpaRepository<Product, Long> {

}
