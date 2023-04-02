package com.shopturant.ShopTurant.controller;

import com.shopturant.ShopTurant.user.entity.User;
import com.shopturant.ShopTurant.user.service.UserService;
import common.Response;
import common.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/register")
    public Response<String> registerUser(@RequestBody UserDetails userDetails) {
        if(!userDetails.isValid())
            return new Response<>("Details are not valid !!", HttpStatusCode.valueOf(200));

        boolean status = userService.saveUser(userDetails);
        if(!status) {
            return new Response<>("A user with this email already exists.", HttpStatusCode.valueOf(200));
        }
        return new Response<>("User is registered.", HttpStatusCode.valueOf(201));
    }

    @PostMapping("/login")
    public Response<?> loginUser(@RequestBody UserDetails userDetails) {
        if(!userDetails.isValidForLogin())
            return new Response<>("Details are not valid !!", HttpStatusCode.valueOf(200));

        userDetails = userService.loginUser(userDetails);

        if(userDetails == null)
            return new Response<>("Details are not valid !!", HttpStatusCode.valueOf(200));

        return new Response<>(userDetails, HttpStatusCode.valueOf(200));
    }
    @PostMapping("/userDetails")
    public Response<?> userDetails(@RequestBody UserDetails userDetails) {
        System.out.println(userDetails.toString());
        if(userDetails.getId() == null)
            return new Response<>("Details are not valid !!", HttpStatusCode.valueOf(200));

        User user = userService.getUserById(userDetails.getId());

        if(user == null)
            return new Response<>("Details are not valid !!", HttpStatusCode.valueOf(200));

        return new Response<>(user, HttpStatusCode.valueOf(200));
    }

    @PostMapping("/reset")
    public Response<?> resetUser(@RequestBody UserDetails userDetails) {
        if(!userDetails.isValidForReset())
            return new Response<>("Details are not valid !!", HttpStatusCode.valueOf(200));

        boolean status = userService.resetPassword(userDetails);

        if(!status)
            return new Response<>("Details are not valid !! ", HttpStatusCode.valueOf(200));

        return new Response<>("Password is Updated.", HttpStatusCode.valueOf(200));
    }
}
