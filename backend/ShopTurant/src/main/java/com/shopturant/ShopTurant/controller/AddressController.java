package com.shopturant.ShopTurant.controller;

import com.shopturant.ShopTurant.address.dto.AddressDto;
import com.shopturant.ShopTurant.address.entity.Address;
import com.shopturant.ShopTurant.address.service.AddressService;
import com.shopturant.ShopTurant.user.entity.User;
import com.shopturant.ShopTurant.user.service.UserService;
import common.Response;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.bind.annotation.*;

@RestController
public class AddressController {

    @Autowired
    UserService userService;
    @Autowired
    AddressService addressService;

    @PostMapping("/address/add")
    public Response<?> addAddress(@RequestBody AddressDto addressDto) {
        if(!addressDto.isValid())
            return new Response<>("Invalid data!", 500);

        User user = userService.getUserById(addressDto.getUserId());
        if(user == null)
            return new Response<>("Invalid user!", 500);

        addressService.save(addressDto);
        return new Response<>("Address added successfully!", 200);
    }
    @PostMapping("/address/update")
    public Response<?> updateAddress(@RequestBody AddressDto addressDto) {
        if(!addressDto.isValid() || addressDto.getId() == null)
            return new Response<>("Invalid data!", 500);
        Address address = addressService.getAddressById(addressDto.getId());
        User user = userService.getUserById(addressDto.getUserId());
        if(user == null)
            return new Response<>("Invalid user!", 500);
        if(address == null)
            return new Response<>("Invalid Address!", 500);

        addressService.save(addressDto);
        return new Response<>("Address added successfully!", 200);
    }

    @PostMapping("/address/delete")
    public Response<?> removeAddress(@RequestParam Long id) {
        boolean status = addressService.removeAddressById(id);
        if(!status)
            return new Response<>("Invalid Address !", 500);

        return new Response<>("Address removed successfully!", 200);
    }
    @PostMapping("/address")
    public Response<?> getAddressByUserId(@RequestParam Long userId) {
        User user = userService.getUserById(userId);
        if(user == null)
            return new Response<>("Invalid user!", 500);
        return new Response<>(addressService.getAddressByUserId(userId), 200);
    }

    @PostMapping("/address/{id}")
    public Response<Address> getAddressById(@PathVariable Long id) {
        if(id == null)
            return new Response<>(null, 500);
        Address address = addressService.getAddressById(id);
        return new Response<>(address, 200);
    }
}
