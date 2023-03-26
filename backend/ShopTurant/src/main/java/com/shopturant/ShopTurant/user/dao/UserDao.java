package com.shopturant.ShopTurant.user.dao;

import com.shopturant.ShopTurant.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface UserDao extends JpaRepository<User, Long> {

    @Query(value = "Select * from user where email = :email limit 1", nativeQuery = true)
    public User getUserByEmailId(String email);
    @Query(value = "Select * from user where email = :email and password_hash = :password limit 1", nativeQuery = true)
    public User getUserByEmailAndPassword(String email, String password);
    @Modifying
    @Transactional
    @Query(value = "Update user set password_hash = :password where id = :id ", nativeQuery = true)
    public void resetPasswordById(Long id, String password);
    @Query(value = "select * from user where id = :id and is_seller = true", nativeQuery = true)
    public User getSellerById(Long id);
    @Query(value = "select * from user where id = :id", nativeQuery = true)
    public User getUserById(Long id);
}
