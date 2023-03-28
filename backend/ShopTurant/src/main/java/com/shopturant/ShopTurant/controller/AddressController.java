package com.shopturant.ShopTurant.controller;

import com.shopturant.ShopTurant.address.dto.AddressDto;
import com.shopturant.ShopTurant.address.entity.Address;
import com.shopturant.ShopTurant.address.service.AddressService;
import com.shopturant.ShopTurant.user.entity.User;
import com.shopturant.ShopTurant.user.service.UserService;
import common.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AddressController {

    @Autowired
    UserService userService;
    @Autowired
    AddressService addressService;

    @PostMapping("/address/add")
    public Response<?> addAddress(@RequestBody AddressDto addressDto) {
        if(!addressDto.isValid())
            return new Response<>("Invalid data!", HttpStatusCode.valueOf(200));

        User user = userService.getUserById(addressDto.getUserId());
        if(user == null)
            return new Response<>("Invalid user!", HttpStatusCode.valueOf(200));

        addressService.save(addressDto);
        return new Response<>("Address added successfully!", HttpStatusCode.valueOf(201));
    }
    @PostMapping("/address/update")
    public Response<?> udpateAddress(@RequestBody AddressDto addressDto) {
        if(!addressDto.isValid() || addressDto.getId() == null)
            return new Response<>("Invalid data!", HttpStatusCode.valueOf(200));
        Address address = addressService.getAddressById(addressDto.getId());
        User user = userService.getUserById(addressDto.getUserId());
        if(user == null)
            return new Response<>("Invalid user!", HttpStatusCode.valueOf(200));
        if(address == null)
            return new Response<>("Invalid Address!", HttpStatusCode.valueOf(200));

        addressService.save(addressDto);
        return new Response<>("Address added successfully!", HttpStatusCode.valueOf(201));
    }

    @PostMapping("/address/remove")
    public Response<?> removeAddress(@RequestParam Long id) {
        boolean status = addressService.removeAddressById(id);
        if(!status)
            return new Response<>("Invalid Address !", HttpStatusCode.valueOf(200));

        return new Response<>("Address removed successfully!", HttpStatusCode.valueOf(200));
    }
    @PostMapping("/address")
    public Response<?> getAddressByUserId(@RequestParam Long userId) {
        User user = userService.getUserById(userId);
        if(user == null)
            return new Response<>("Invalid user!", HttpStatusCode.valueOf(200));
        return new Response<>(addressService.getAddressByUserId(userId), HttpStatusCode.valueOf(200));
    }
}
