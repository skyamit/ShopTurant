package com.shopturant.ShopTurant.category.service;

import com.shopturant.ShopTurant.category.dao.CategoryDao;
import com.shopturant.ShopTurant.category.entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    @Autowired
    CategoryDao categoryDao;

    public Category addCategory(String title) {
        Long id = categoryDao.getIdByTitle(title);
        if(id != null)
            return null;
        Category category = new Category();
        category.setTitle(title);
        category.setIsActive(true);
        category = categoryDao.save(category);
        return category;
    }

    public Category getCategoryByTitle(String title) {
        Category category = categoryDao.getCategoryByTitle(title);
        if(category == null) {
            category = addCategory(title);
        }
        return category;
    }
    public List<Category> getAllActiveCategory() {
        return categoryDao.getAllActiveCategory();
    }
}
