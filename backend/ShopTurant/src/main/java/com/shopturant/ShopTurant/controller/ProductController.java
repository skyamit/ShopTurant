package com.shopturant.ShopTurant.controller;

import com.shopturant.ShopTurant.product.dto.ProductDto;
import com.shopturant.ShopTurant.product.entity.Product;
import com.shopturant.ShopTurant.product.service.ProductService;
import common.Response;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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

    @GetMapping("/product/{id}")
    public Response<?> getProductById(@PathVariable Long id) {
        if(id == null)
            return new Response<>(new ArrayList<>(), HttpStatusCode.valueOf(200),"Unable to add Product.");
        return new Response<>(productService.getProductById(id), HttpStatusCode.valueOf(200),"Product Found");
    }

    @PostMapping("/product/{userId}")
    public Response<?> addProducts(@PathVariable Long userId) {
        if(userId == null)
            return new Response<>("Unable to add Product.", HttpStatusCode.valueOf(200));

        return new Response<>(productService.getProductsByUserId(userId), HttpStatusCode.valueOf(200));
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
            return new Response<>(new ArrayList<>(), HttpStatusCode.valueOf(200), "No Record Exists");

        return new Response<>(products, HttpStatusCode.valueOf(200));
    }

    @PostMapping("/productsByCategory/{categoryId}")
    public Response<?> getProductsByCategoryId(@PathVariable Long categoryId) {
        if(categoryId == null)
            return new Response<>("Category Id is required", HttpStatusCode.valueOf(200));

        return new Response<>(productService.getProductsByCategoryId(categoryId), HttpStatusCode.valueOf(200));
    }
}
