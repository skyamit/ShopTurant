package com.shopturant.ShopTurant.category.dao;

import com.shopturant.ShopTurant.category.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CategoryDao extends JpaRepository<Category, Long> {

    @Query(value = "select id from category where title = :title and is_active = true  limit 1", nativeQuery = true)
    public Long getIdByTitle(String title);

    @Query(value = "select * from category where is_active = true order by id desc limit 20", nativeQuery = true)
    public List<Category> getAllActiveCategory();

    @Query(value = "select * from category where title = :title limit 1", nativeQuery = true)
    public Category getCategoryByTitle(String title);
}
