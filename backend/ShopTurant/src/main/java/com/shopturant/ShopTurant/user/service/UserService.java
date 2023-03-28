package com.shopturant.ShopTurant.user.service;

import com.google.common.hash.Hashing;
import com.shopturant.ShopTurant.user.dao.UserDao;
import com.shopturant.ShopTurant.user.entity.User;
import common.UserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class UserService {

    @Autowired
    UserDao userDao;

    public boolean saveUser(UserDetails userDetails) {
        // check if user exists or not
        User user = userDao.getUserByEmailId(userDetails.getEmail());
        if(user != null)
            return false;

        User newUser = new User();
        newUser.setEmail(userDetails.getEmail());
        newUser.setName(userDetails.getName());
        String hashedPassword = Hashing.sha256()
                .hashString(userDetails.getPassword(), StandardCharsets.UTF_8)
                .toString();
        newUser.setPasswordHash(hashedPassword);
        newUser.setIsSeller(userDetails.getIsSeller());
        newUser.setMobileNo(userDetails.getPhoneNo());
        newUser.setRegisteredAt(new Date());
        newUser.setIsActive(userDetails.getIsActive());
        userDao.save(newUser);
        return true;
    }

    public UserDetails loginUser(UserDetails userDetails) {
        String hashedPassword = Hashing.sha256()
                .hashString(userDetails.getPassword(), StandardCharsets.UTF_8)
                .toString();
        User user = userDao.getUserByEmailAndPassword(userDetails.getEmail(), hashedPassword);
        if(user == null)
            return null;
        UserDetails currUser = new UserDetails();
        currUser.setName(user.getName());
        currUser.setId(user.getId());
        currUser.setEmail(user.getEmail());
        currUser.setPhoneNo(user.getMobileNo());
        currUser.setIsSeller(user.getIsSeller());
        currUser.setIsActive(user.getIsActive());
        return currUser;
    }

    public boolean resetPassword(UserDetails userDetails) {
        String hashedPassword = Hashing.sha256()
                .hashString(userDetails.getPassword(), StandardCharsets.UTF_8)
                .toString();
        User user = userDao.getUserByEmailAndPassword(userDetails.getEmail(), hashedPassword);

        if(user == null)
            return false;

        String hashedNewPassword = Hashing.sha256()
                .hashString(userDetails.getNewPassword(), StandardCharsets.UTF_8)
                .toString();

        userDao.resetPasswordById(userDetails.getId(), hashedNewPassword);
        return true;
    }

    public User getUserById(Long id) {
        return userDao.getUserById(id);
    }
}
