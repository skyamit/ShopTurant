package common;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class UserDetails {
    Long id;
    String name;
    String email;
    String password;
    Long phoneNo;
    Boolean isActive;
}
