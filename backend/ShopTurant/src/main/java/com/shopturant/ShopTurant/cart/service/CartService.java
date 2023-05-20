package com.shopturant.ShopTurant.cart.service;

import com.shopturant.ShopTurant.cart.dao.CartDao;
import com.shopturant.ShopTurant.cart.dto.CartDto;
import com.shopturant.ShopTurant.cart.entity.Cart;
import com.shopturant.ShopTurant.product.entity.Product;
import com.shopturant.ShopTurant.product.service.ProductService;
import com.shopturant.ShopTurant.user.entity.User;
import com.shopturant.ShopTurant.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartService {

    @Autowired
    CartDao cartDao;
    @Autowired
    UserService userService;
    @Autowired
    ProductService productService;

    public boolean save(CartDto cartDto) {
        User user = userService.getUserById(cartDto.getUser());
        Product product = productService.getProductById(cartDto.getProduct());
        if(user == null)
            return false;
        if(product == null)
            return false;

        Cart cart = convertCartDtoToCart(cartDto, user, product);
        cart.setIsActive(true);
        cartDao.save(cart);
        return true;
    }

    public boolean removeByCartId(Long id) {
        Cart cart = cartDao.getReferenceById(id);
        if(cart == null)
            return false;
        cartDao.removeByCartId(id);
        return true;
    }

    public boolean removeByCartIds(List<Long> ids) {
        cartDao.removeByCartIds(ids);
        return true;
    }

    public boolean checkIfAlreadyInCart(Long userId, Long productId) {
        List<Cart> cartList = cartDao.checkIfAlreadyInCart(userId,productId);
        if(cartList==null)
            return false;
        if(cartList.size() == 0)
            return false;
        return true;
    }
    public List<Cart> getAllCartByUserId(Long userId) {
        User user = userService.getUserById(userId);
        if(user == null)
            return new ArrayList<>();
        List<Cart> list = cartDao.getAllByUserId(userId);
        return list;
    }
    public Cart convertCartDtoToCart(CartDto cartDto, User user, Product product) {
        Cart cart = new Cart();
        cart.setCount(cartDto.getCount());
        cart.setUserId(user);
        cart.setProductId(product);
        return cart;
    }
    public CartDto convertCartToCartDto(Cart cart) {
        CartDto cartDto = new CartDto();
        cartDto.setCount(cart.getCount());
        cartDto.setUser(cart.getUserId().getId());
        cartDto.setProduct(cart.getProductId().getId());
        return cartDto;
    }

    public Long getCartCountByUserId(Long userId) {
        return cartDao.getCartCountByUserId(userId);
    }

    public List<Cart> getAllCartByIds(List<Long> ids) {
        return cartDao.getAllCartByIds(ids);
    }
}
