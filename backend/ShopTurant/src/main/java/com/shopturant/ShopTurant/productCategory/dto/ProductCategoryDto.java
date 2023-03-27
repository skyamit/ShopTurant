package com.shopturant.ShopTurant.productCategory.dto;

import com.shopturant.ShopTurant.productCategory.service.ProductCategoryService;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Getter
@Setter
public class ProductCategoryDto {
    Long id;
    Long productId;
    Long categoryId;

    public ProductCategoryDto(Long productId, Long categoryId) {
        this.productId = productId;
        this.categoryId = categoryId;
    }

    public boolean isValid() {
        if(productId == null)
            return false;
        if(categoryId == null)
            return false;
        return true;
    }
}
