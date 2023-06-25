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
            return new Response<>("Unable to add Product.", 500);

        boolean status = productService.addProduct(productDto);
        if(status)
            return new Response<>("Product Added.", 200);

        return new Response<>("Unable to add Product.", 500);
    }

    @DeleteMapping("/product/{id}")
    public Response<?> deleteProduct(@PathVariable Long id) {
        if(id == null)
            return new Response<>("Invalid Product Id!!", 500);

        Product product = productService.getProductById(id);
        if(product == null)
            return new Response<>("Invalid Product Id!!", 500);

        product.setIsActive(false);
        product = productService.saveOrUpdate(product);

        return new Response<>("Product removed!!", 200);
    }

    @GetMapping("/product/{id}")
    public Response<?> getProductById(@PathVariable Long id) {
        if(id == null)
            return new Response<>(new ArrayList<>(), 500,"Unable to add Product.");
        return new Response<>(productService.getProductById(id), 200,"Product Found");
    }

    @PostMapping("/product/{userId}")
    public Response<?> addProducts(@PathVariable Long userId) {
        if(userId == null)
            return new Response<>("Unable to add Product.", 500);

        return new Response<>(productService.getProductsByUserId(userId), 200);
    }


    @PostMapping("/product")
    public Response<?> getProducts() {
        List<ProductDto> products = productService.getAllActiveProducts();
        if(products == null || products.size()==0)
            return new Response<>("Error Occurred..", 500);

        return new Response<>(products, 200 );
    }
    @PostMapping("/product/search")
    public Response<?> getProducts(@RequestParam String search, @RequestParam Integer offset) {
        List<ProductDto> products = productService.getAllProductsBySearch(search, offset);
        if(products == null || products.size()==0)
            return new Response<>(new ArrayList<>(), 500, "No Record Exists");

        return new Response<>(products, 200);
    }

    @PostMapping("/productsByCategory/{categoryId}")
    public Response<?> getProductsByCategoryId(@PathVariable Long categoryId) {
        if(categoryId == null)
            return new Response<>("Category Id is required", 500);

        return new Response<>(productService.getProductsByCategoryId(categoryId), 200);
    }
}
