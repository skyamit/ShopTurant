package com.shopturant.ShopTurant.product.dao;

import com.shopturant.ShopTurant.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductDao extends JpaRepository<Product, Long> {

    @Query(value = "select * from product where is_active = true order by id desc", nativeQuery = true)
    public List<Product> getAllActiveProducts();

    @Query(value = "select p.* from product p left join product_category pc on p.id = pc.product left join category c on  pc.category = c.id where p.title like %:search% or c.title like %:search% and p.is_active is true limit 10 offset :offset",
    nativeQuery = true)
    public List<Product> getAllProductsBySearch(String search, Integer offset);

    @Query(value = "select * from product where user = :userId and is_active is true", nativeQuery = true)
    public List<Product> getAllProductByUserId(Long userId);

    @Query(value = "select p.* from product p left join product_category pc on p.id = pc.product join category c on  pc.category = c.id where c.id = :id and p.is_active is true order by p.id desc limit 5",nativeQuery = true)
    List<Product> getProductsByCategoryId(Long id);

    @Query(value = "select * from product where id = :id", nativeQuery = true)
    Product getProductsById(Long id);
}
