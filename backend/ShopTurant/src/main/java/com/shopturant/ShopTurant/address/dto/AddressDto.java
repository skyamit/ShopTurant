package com.shopturant.ShopTurant.address.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
public class AddressDto {
    Long id;
    Long userId;
    String name;
    Long mobileNo;
    String email;
    String line1;
    String line2;
    String city;
    String state;
    String country;
    Boolean isActive;
    @JsonIgnore
    public boolean isValid() {
        if(name == null || name.isEmpty())
            return false;
        if(userId == null)
            return false;
        if(mobileNo==null || mobileNo.toString().length() != 10)
            return false;
        if(line1 == null || line1.isEmpty())
            return false;
        if(city == null || city.isEmpty())
            return false;
        if(state == null || state.isEmpty())
            return false;
        if(country == null || country.isEmpty())
            return false;
        return true;
    }
}
