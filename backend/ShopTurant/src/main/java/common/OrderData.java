package common;

import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@ToString
@EqualsAndHashCode
public class OrderData {
    List<Long> cartIds;
    Long addressId;
    Double cost;
    Long userId;

}
