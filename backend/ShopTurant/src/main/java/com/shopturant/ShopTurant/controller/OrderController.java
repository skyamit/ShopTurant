package com.shopturant.ShopTurant.controller;

import com.shopturant.ShopTurant.address.entity.Address;
import com.shopturant.ShopTurant.address.service.AddressService;
import com.shopturant.ShopTurant.cart.entity.Cart;
import com.shopturant.ShopTurant.cart.service.CartService;
import com.shopturant.ShopTurant.orderItem.entity.OrderItem;
import com.shopturant.ShopTurant.orderItem.service.OrderItemService;
import com.shopturant.ShopTurant.orders.dto.OrdersDto;
import com.shopturant.ShopTurant.orders.entity.Orders;
import com.shopturant.ShopTurant.orders.service.OrdersService;
import com.shopturant.ShopTurant.product.service.ProductService;
import com.shopturant.ShopTurant.user.entity.User;
import com.shopturant.ShopTurant.user.service.UserService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Product;
import com.stripe.param.PaymentIntentCreateParams;
import common.Constants;
import common.OrderData;
import common.Response;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
public class OrderController {
    
    @Autowired
    OrdersService ordersService;
    @Autowired
    UserService userService;
    @Autowired
    CartService cartService;
    @Autowired
    ProductService productService;
    @Autowired
    AddressService addressService;
    @Autowired
    OrderItemService orderItemService;

    @PostMapping("/orders/save")
    public Response<?> saveOrders(@RequestBody Orders orders) {
        if(!orders.isValid()) {
            return new Response<>("Invalid Request..", 500);
        }

        orders = ordersService.save(orders);
        return new Response<>("Request Submitted..", 200);
    }

    @PostMapping("/order/cancel")
    public Response<?> cancelOrder(@RequestParam Long orderId) {
        if(orderId == null)
            return new Response<>("Invalid Request..", 500);

        boolean status = ordersService.cancelOrder(orderId);
        if(status)
            return new Response<>("Order Cancelled.", 200);
        return new Response<>("Error occurred..", 500);
    }

    @PostMapping("/orders")
    public Response<?> getOrdersByUserId(@RequestParam Long userId) {
        if(userId==null)
            return new Response<>("Invalid User id", 500);

        List<Orders> list = ordersService.getOrdersByUserId(userId);
        List<Long> orderIds = list.stream().map(Orders::getId).toList();
        List<OrderItem> orderItems = orderItemService.getAllByOrderIds(orderIds);
        Map<Long, List<OrderItem>> map = new HashMap<>();
        for(OrderItem orderItem : orderItems) {
            List<OrderItem> l = map.getOrDefault(orderItem.getOrderId().getId(), new ArrayList<>());
            l.add(orderItem);
            map.put(orderItem.getOrderId().getId(), l);
            orderItem.setOrderId(null);
        }
        List<OrdersDto> ordersDtos = new ArrayList<>();
        for(Orders l : list) {
            OrdersDto ordersDto = new OrdersDto(l, map.getOrDefault(l.getId(), new ArrayList<>()));
            ordersDtos.add(ordersDto);
        }
        return new Response<>(ordersDtos, 200);
    }

    @PostMapping("/payments")
    public Response<?> payments(@RequestBody OrderData orderData) throws StripeException {
        System.out.println(orderData.toString());
        Stripe.apiKey = "sk_test_51N9gdWSCxComyq37LDDfyS7I2JKYdS0bD0xY9qT8w4BgATaLQstD4zr5p1tapmiDgj0deVHmXTGDvgYVWRMeAJzZ00HyXgC2nO";
        User user = userService.getUserById(orderData.getUserId());
        List<Cart> carts = cartService.getAllCartByIds(orderData.getCartIds());
        Double cost = orderData.getCost();
        Address address = addressService.getAddressById(orderData.getAddressId());
        if(user == null || carts == null)
            return new Response<>("Invalid Data", 500);
        if(carts.isEmpty() || address == null)
            return new Response<>("Invalid Data", 500);
        if(cost == null || cost == 0)
            return new Response<>("Invalid Data", 500);

        PaymentIntentCreateParams params =
                PaymentIntentCreateParams.builder()
                    .setDescription("Purchasing products from ShopTurant")
                    .setShipping(
                        PaymentIntentCreateParams.Shipping.builder()
                            .setName(user.getName())
                            .setAddress(
                                PaymentIntentCreateParams.Shipping.Address.builder()
                                        .setLine1(address.getLine1())
                                        .setCity(address.getCity())
                                        .setState(address.getState())
                                        .setCountry(address.getCountry())
                                        .build()
                            )
                            .build()
                    )
                    .setAmount(cost.longValue()*100)
                    .setCurrency("inr")
                    .setAutomaticPaymentMethods(
                            PaymentIntentCreateParams.AutomaticPaymentMethods.builder().setEnabled(true).build()
                    )
                    .build();

        Orders orders = new Orders();
        orders.setOrderedAt(LocalDateTime.now());
        orders.setAddressId(address);
        orders.setCost(cost.longValue());
        orders.setUserId(user);
        orders.setStatus(Constants.ORDER_STATUS_ORDERED);
        orders.setPaymentMode("Online");
        orders = ordersService.save(orders);

        List<OrderItem> orderItems = new ArrayList<>();
        for(Cart c : carts) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrderId(orders);
            orderItem.setPrice(c.getProductId().getPrice() - c.getProductId().getPrice()*c.getProductId().getDiscount()/100);
            orderItem.setCount(c.getCount());
            orderItem.setProductId(c.getProductId());
            orderItems.add(orderItem);
        }
        orderItems = orderItemService.saveAll(orderItems);

        PaymentIntent paymentIntent = PaymentIntent.create(params);
        System.out.println(paymentIntent.getClientSecret());
        return new Response<>("Payment Proccessed", 200, paymentIntent.getClientSecret());
    }
}
