package com.shopturant.ShopTurant.controller;

import common.Response;
import common.UserDetails;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @GetMapping("/register")
    public Response<String> registerUser(@RequestBody UserDetails userDetails) {
        System.out.println(userDetails.toString());
        return new Response<>("registerUser api was called", HttpStatusCode.valueOf(200));
    }
}
