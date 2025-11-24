package ma.fstt.atelier7_springrest.web.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequest {

    @NotBlank
    private String username;

    @NotBlank
    private String password;

    private String role = "ROLE_USER";
}


