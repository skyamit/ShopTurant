package com.shopturant.ShopTurant.product.service;

import com.shopturant.ShopTurant.product.dao.ProductDao;
import com.shopturant.ShopTurant.product.dto.ProductDto;
import com.shopturant.ShopTurant.product.entity.Product;
import com.shopturant.ShopTurant.user.dao.UserDao;
import com.shopturant.ShopTurant.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ProductService {
    @Autowired
    ProductDao productDao;
    @Autowired
    UserDao userDao;
    public boolean addProduct(ProductDto productDto) {
        User user = userDao.getSellerById(productDto.getUserId());
        if(user == null)
            return false;
        Product product = new Product();
        product.setCreatedAt(new Date());
        product.setPrice(productDto.getPrice());
        product.setIsActive(true);
        product.setTitle(productDto.getTitle());
        product.setSummary(productDto.getSummary());
        product.setType(productDto.getType());
        product.setUserId(user);
        product.setDiscount(productDto.getDiscount());
        productDao.save(product);
        return true;
    }

    public List<ProductDto> getAllActiveProducts() {
        List<Product> list = productDao.getAllActiveProducts();
        List<ProductDto> products = new ArrayList<>();

        for(Product product : list) {
            ProductDto dto = new ProductDto();
            dto.setId(product.getId());
            dto.setCreatedAt(product.getCreatedAt());
            dto.setPrice(product.getPrice());
            dto.setTitle(product.getTitle());
            dto.setSummary(product.getSummary());
            dto.setType(product.getType());
            dto.setDiscount(product.getDiscount());
            products.add(dto);
        }

        return products;
    }
}

