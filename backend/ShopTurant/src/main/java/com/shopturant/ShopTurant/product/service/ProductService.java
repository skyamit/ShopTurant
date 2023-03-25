package com.shopturant.ShopTurant.product.service;

import com.shopturant.ShopTurant.product.dao.ProductDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
    @Autowired
    ProductDao productDao;
}

