package com.shopturant.ShopTurant.product.dto;

import com.shopturant.ShopTurant.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
@Setter
public class ProductDto {
    Long id;
    Long userId;
    String title;
    String summary;
    String type;
    Long price;
    Date createdAt;
    String imageId; //productId/product/image
    Integer discount;
    List<String> category;

    public boolean isValid() {
        /* { "userId":6, "title":"Ignited Minds", "summary":"Unleashing the power within INDIA by APJ Abdul Kalam.",
        "price":200, "discount":2, "imageId":"/image/ignitedMinds" } */
        if(userId == null)
            return false;
        if(title == null || title.isEmpty())
            return false;
        if(price == null)
            return false;
        if(summary == null || summary.isEmpty())
            return false;
        if(discount == null)
            return false;
        if(imageId == null)
            return false;
        return true;
    }
}
