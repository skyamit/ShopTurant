package com.shopturant.ShopTurant.controller;

import com.shopturant.ShopTurant.cart.dto.CartDto;
import com.shopturant.ShopTurant.cart.service.CartService;
import common.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CartController {
    @Autowired
    CartService cartService;
    @PostMapping("/cart/add")
    public Response<?> addProductToCart(@RequestBody CartDto cartDto) {
        if(cartDto.isValid()){
            return new Response<>("Invalid data, Please try again..", HttpStatusCode.valueOf(200));
        }
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
        List<CartDto> list = cartService.getAllCartByUserId(id);
        if(list == null || list.size() == 0)
            return new Response<>("No record exists.", HttpStatusCode.valueOf(200));

        return new Response<>(list, HttpStatusCode.valueOf(201));
    }
}
