package com.shopturant.ShopTurant.productCategory.service;

import com.shopturant.ShopTurant.category.dao.CategoryDao;
import com.shopturant.ShopTurant.category.entity.Category;
import com.shopturant.ShopTurant.product.dao.ProductDao;
import com.shopturant.ShopTurant.product.entity.Product;
import com.shopturant.ShopTurant.productCategory.dao.ProductCategoryDao;
import com.shopturant.ShopTurant.productCategory.dto.ProductCategoryDto;
import com.shopturant.ShopTurant.productCategory.entity.ProductCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductCategoryService {
    @Autowired
    ProductCategoryDao productCategoryDao;
    @Autowired
    ProductDao productDao;
    @Autowired
    CategoryDao categoryDao;

    public boolean addProductCategory(ProductCategoryDto productCategoryDto) {
        if(!productCategoryDto.isValid()){
            return false;
        }
        ProductCategory productCategory = productCategoryDao.getByProductAndCategory(productCategoryDto.getProductId(),
                productCategoryDto.getCategoryId());
        if(productCategory != null)
            return false;

        productCategory = new ProductCategory();

        Category category = categoryDao.getReferenceById(productCategoryDto.getCategoryId());
        productCategory.setCategory(category);
        Product product = productDao.getReferenceById(productCategoryDto.getProductId());
        productCategory.setProduct(product);
        productCategoryDao.save(productCategory);
        return true;
    }

}
