package com.shopturant.ShopTurant.address.service;

import com.shopturant.ShopTurant.address.dao.AddressDao;
import com.shopturant.ShopTurant.address.dto.AddressDto;
import com.shopturant.ShopTurant.address.entity.Address;
import com.shopturant.ShopTurant.user.service.UserService;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AddressService {
    @Autowired
    AddressDao addressDao;
    @Autowired
    UserService userService;
    public List<AddressDto> getAddressByUserId(Long userId){
        List<Address> list =  addressDao.getAddressByUserId(userId);
        List<AddressDto> addressList = new ArrayList<>();
        for(Address address : list) {
            addressList.add(convertAddressToAddressDto(address));
        }
        return addressList;
    }
    public void save(AddressDto addressDto) {
        Address address = convertAddressDtoToAddress(addressDto);
        address.setIsActive(true);
        addressDao.save(address);
    }
    public void update(AddressDto addressDto) {
        Address address = convertAddressDtoToAddress(addressDto);
        address.setIsActive(true);
        addressDao.saveAndFlush(address);
    }

    public Address getAddressById(Long id) {
        return addressDao.getAddressById(id);
    }

    public boolean removeAddressById(Long id) {
        Address address = getAddressById(id);
        if(address == null)
            return false;
        addressDao.removeAddressById(id);
        return true;
    }
    public AddressDto convertAddressToAddressDto(Address address) {
        AddressDto addressDto = new AddressDto();
        addressDto.setId(address.getId());
        addressDto.setCity(address.getCity());
        addressDto.setCountry(address.getCountry());
        addressDto.setEmail(address.getEmail());
        addressDto.setName(address.getName());
        addressDto.setIsActive(address.getIsActive());
        addressDto.setState(address.getState());
        addressDto.setLine1(address.getLine1());
        addressDto.setLine2(address.getLine2());
        addressDto.setMobileNo(address.getMobileNo());
        return addressDto;
    }

    public Address convertAddressDtoToAddress(AddressDto address) {
        Address addressDto = new Address();
        addressDto.setId(addressDto.getId());
        addressDto.setCity(address.getCity());
        addressDto.setUser(userService.getUserById(address.getUserId()));
        addressDto.setCountry(address.getCountry());
        addressDto.setEmail(address.getEmail());
        addressDto.setName(address.getName());
        addressDto.setIsActive(address.getIsActive());
        addressDto.setState(address.getState());
        addressDto.setLine1(address.getLine1());
        addressDto.setLine2(address.getLine2());
        addressDto.setMobileNo(address.getMobileNo());
        return addressDto;
    }
}
