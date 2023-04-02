package common;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class UserDetails {
    /*
        {"name":"Amit Kumar", "email":"amit7646014@gmail.com", "password":"password", "phoneNo":6204712464 }
     */
    Long id;
    String name;
    String email;
    String password;
    String newPassword;
    Long phoneNo;
    Boolean isActive;
    Boolean isSeller;

    @JsonIgnore
    public boolean isValid() {
        System.out.println(this);
        if(name == null || name.length()==0)
            return false;
        if(email == null || email.length()==0)
            return false;
        if(password == null || password.length()==0)
            return false;
        if(phoneNo == null )
            return false;
        return true;
    }

    @JsonIgnore
    public boolean isValidForLogin() {
        if(email == null || email.length()==0)
            return false;
        if(password == null || password.length()==0)
            return false;
        return true;
    }

    @JsonIgnore
    public boolean isValidForReset() {
        if(email == null || email.length()==0)
            return false;
        if(password == null || password.length()==0)
            return false;
        if(newPassword == null || newPassword.length()==0)
            return false;
        return true;
    }
}
