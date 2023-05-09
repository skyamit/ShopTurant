package com.shopturant.ShopTurant.controller;

import com.shopturant.ShopTurant.category.entity.Category;
import com.shopturant.ShopTurant.category.service.CategoryService;
import common.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CategoryController {
    @Autowired
    CategoryService categoryService;
    @PostMapping("/category/add")
    public Response<?> addCategory(@RequestParam String category) {
        if(category == null || category.isEmpty())
            return new Response("Category is not valid!!", 500);

        Category categoryRes = categoryService.addCategory(category);
        if(category == null)
            return new Response<>("Category already exists.", 500);

        return new Response(categoryRes, 200);
    }

    @PostMapping("/category")
    public Response<?> getAllActiveCategory() {
        return new Response<>(categoryService.getAllActiveCategory(), 200);
    }
}
