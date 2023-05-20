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

    @Query(value = "select * from cart where user = :userId and product = :productId and is_active is true", nativeQuery = true)
    public List<Cart> checkIfAlreadyInCart(Long userId, Long productId);

    @Query(value = "select * from cart where user = :userId and is_active is true order by id desc", nativeQuery = true)
    public List<Cart> getAllByUserId(Long userId);

    @Query(value = "select count(*) from cart where user = :userId and is_active is true", nativeQuery = true)
    Long getCartCountByUserId(Long userId);

    @Query(value = "select * from cart where id in (:ids) order by id desc", nativeQuery = true)
    public List<Cart> getAllCartByIds(List<Long> ids);

    @Modifying
    @Transactional
    @Query(value = "update cart set is_active = false where id in (:ids) ", nativeQuery = true)
    void removeByCartIds(List<Long> ids);
}
