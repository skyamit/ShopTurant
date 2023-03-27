package com.shopturant.ShopTurant.controller;

import com.shopturant.ShopTurant.product.dto.ProductDto;
import com.shopturant.ShopTurant.product.entity.Product;
import com.shopturant.ShopTurant.product.service.ProductService;
import common.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ProductController {

    @Autowired
    ProductService productService;

    @PostMapping("/product/add")
    public Response<?> addProducts(@RequestBody ProductDto productDto) {
        if(!productDto.isValid())
            return new Response<>("Unable to add Product.", HttpStatusCode.valueOf(200));

        boolean status = productService.addProduct(productDto);
        if(status)
            return new Response<>("Product Added.", HttpStatusCode.valueOf(201));

        return new Response<>("Unable to add Product.", HttpStatusCode.valueOf(200));
    }

    @PostMapping("/product")
    public Response<?> getProducts() {
        List<ProductDto> products = productService.getAllActiveProducts();
        if(products == null || products.size()==0)
            return new Response<>("Error Occurred..", HttpStatusCode.valueOf(200));

        return new Response<>(products, HttpStatusCode.valueOf(200));
    }
    @PostMapping("/product/search")
    public Response<?> getProducts(@RequestParam String search, @RequestParam Integer offset) {
        List<ProductDto> products = productService.getAllProductsBySearch(search, offset);
        if(products == null || products.size()==0)
            return new Response<>("No Record Exists", HttpStatusCode.valueOf(200));

        return new Response<>(products, HttpStatusCode.valueOf(200));
    }
}
