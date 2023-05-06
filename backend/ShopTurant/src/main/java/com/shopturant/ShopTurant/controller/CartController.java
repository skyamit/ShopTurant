package com.shopturant.ShopTurant.controller;

import com.shopturant.ShopTurant.cart.dto.CartDto;
import com.shopturant.ShopTurant.cart.entity.Cart;
import com.shopturant.ShopTurant.cart.service.CartService;
import common.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class CartController {
    @Autowired
    CartService cartService;
    @PostMapping("/cart/add")
    public Response<?> addProductToCart(@RequestBody CartDto cartDto) {
        if(!cartDto.isValid()){
            return new Response<>("Invalid data, Please try again..", HttpStatusCode.valueOf(200));
        }
        if(cartService.checkIfAlreadyInCart(cartDto.getUser(), cartDto.getProduct()))
            return new Response<>("Product is already in Cart", HttpStatusCode.valueOf(200));

        boolean status = cartService.save(cartDto);
        if(!status)
            return new Response<>("Invalid data, Please try again..", HttpStatusCode.valueOf(200));

        return new Response<>("Added to cart.", HttpStatusCode.valueOf(201));
    }
    @PostMapping("/cart/remove")
    public Response<?> removeProductFromCart(@RequestParam Long id) {
        boolean status = cartService.removeByCartId(id);
        if(!status)
            return new Response<>("Invalid data, Please try again..", HttpStatusCode.valueOf(200));

        return new Response<>("Removed from cart.", HttpStatusCode.valueOf(201));
    }
    @PostMapping("/cart")
    public Response<?> getAllByUserId(@RequestParam Long id) {
        List<Cart> list = cartService.getAllCartByUserId(id);
        if(list == null || list.size() == 0)
            return new Response<>(new ArrayList<>(), HttpStatusCode.valueOf(200), "No record exists.");

        return new Response<>(list, HttpStatusCode.valueOf(201));
    }

    @PostMapping("/cart/count/{userId}")
    public Response<?> getCartCountByUserId(@PathVariable Long userId) {
        Long count = cartService.getCartCountByUserId(userId);
        return new Response<>(count, HttpStatusCode.valueOf(200));
    }
}
