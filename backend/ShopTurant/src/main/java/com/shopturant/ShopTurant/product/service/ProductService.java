package com.shopturant.ShopTurant.product.service;

import com.shopturant.ShopTurant.category.entity.Category;
import com.shopturant.ShopTurant.category.service.CategoryService;
import com.shopturant.ShopTurant.product.dao.ProductDao;
import com.shopturant.ShopTurant.product.dto.ProductDto;
import com.shopturant.ShopTurant.product.entity.Product;
import com.shopturant.ShopTurant.productCategory.dto.ProductCategoryDto;
import com.shopturant.ShopTurant.productCategory.service.ProductCategoryService;
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
    @Autowired
    ProductCategoryService productCategoryService;
    @Autowired
    CategoryService categoryService;

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
        product.setImageId(productDto.getImageId());
        product.setUserId(user);
        product.setDiscount(productDto.getDiscount());
        product = productDao.save(product);
        if(productDto.getCategory() != null) {
            for (String category : productDto.getCategory()) {
                Category category1 = categoryService.getCategoryByTitle(category);
                productCategoryService.addProductCategory(new ProductCategoryDto(product.getId(), category1.getId()));
            }
        }
        return true;
    }
    public Product getProductById(Long id) {
        return productDao.getProductsById(id);
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

    public List<ProductDto> getAllProductsBySearch(String search, Integer offset) {
        if(offset == null)
            offset = 0;
        if(search==null)
            return new ArrayList<>();
        List<ProductDto> products = new ArrayList<>();
        List<Product> list = productDao.getAllProductsBySearch(search, offset);

        if(list == null || list.size()==0)
            return new ArrayList<>();

        for(Product product : list) {
            ProductDto dto = new ProductDto();
            dto.setId(product.getId());
            dto.setCreatedAt(product.getCreatedAt());
            dto.setPrice(product.getPrice());
            dto.setTitle(product.getTitle());
            dto.setSummary(product.getSummary());
            dto.setType(product.getType());
            dto.setDiscount(product.getDiscount());
            dto.setImageId(product.getImageId());
            products.add(dto);
        }
        return products;
    }

    public List<Product> getProductsByUserId(Long id) {
        if(id == null)
            return new ArrayList<>();

        return productDao.getAllProductByUserId(id);
    }

    public List<Product> getProductsByCategoryId(Long id) {
        if(id == null)
            return new ArrayList<>();

        return productDao.getProductsByCategoryId(id);
    }

    public Product saveOrUpdate(Product product) {
        return productDao.save(product);
    }
}

