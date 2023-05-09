package common;

import lombok.*;
import org.springframework.http.HttpStatusCode;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Response<T> {
    T data;
    Integer statusCode;
    String msg;

    public Response(T data, Integer statusCode) {
        this.data = data;
        this.statusCode = statusCode;
    }
}
