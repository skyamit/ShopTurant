package com.shopturant.ShopTurant.address.dao;

import com.shopturant.ShopTurant.address.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface AddressDao extends JpaRepository<Address, Long> {

    @Query(value = "select * from address where user = :user and is_active = true", nativeQuery = true)
    public List<Address> getAddressByUserId(Long user);

    @Query(value = "select * from address where id = :id and is_active = true", nativeQuery = true)
    public Address getAddressById(Long id);

    @Modifying
    @Transactional
    @Query(value = "update address set is_active = false where id = :id ", nativeQuery = true)
    public void removeAddressById(Long id);
}
