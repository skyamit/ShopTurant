package com.shopturant.ShopTurant.cart.dao;

import com.shopturant.ShopTurant.cart.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CartDao extends JpaRepository<Cart, Long> {

    @Modifying
    @Transactional
    @Query(value = "update cart set is_active = false where id = :id ", nativeQuery = true)
    void removeByCartId(Long id);

    @Query(value = "select * from cart where user = :userId ", nativeQuery = true)
    public List<Cart> getAllByUserId(Long userId);
}
