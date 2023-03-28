package com.shopturant.ShopTurant.cart.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class CartDto {
    Long id;
    Long user;
    Long product;
    Integer count;
    Boolean isActive;

    @JsonIgnore
    public boolean isValid() {
        if(user == null)
            return false;
        if(product == null)
            return false;
        if(count == null)
            return false;
        return true;
    }
}
