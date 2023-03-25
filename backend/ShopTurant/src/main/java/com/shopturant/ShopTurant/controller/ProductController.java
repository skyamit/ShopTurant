package com.shopturant.ShopTurant.controller;

import common.Response;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {

    @PostMapping("/product/add")
    public Response addProducts() {
        return new Response("Product Added.", HttpStatusCode.valueOf(201));
    }
}
