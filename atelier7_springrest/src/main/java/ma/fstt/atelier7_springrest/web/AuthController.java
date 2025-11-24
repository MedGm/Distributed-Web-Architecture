package ma.fstt.atelier7_springrest.web;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.fstt.atelier7_springrest.entities.AppUser;
import ma.fstt.atelier7_springrest.repositories.AppUserRepository;
import ma.fstt.atelier7_springrest.security.JwtUtil;
import ma.fstt.atelier7_springrest.web.dto.AuthRequest;
import ma.fstt.atelier7_springrest.web.dto.AuthResponse;
import ma.fstt.atelier7_springrest.web.dto.RegisterRequest;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final AppUserRepository appUserRepository;

    @PostMapping("/login")
    public AuthResponse login(@RequestBody @Valid AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtUtil.generateToken(userDetails);
        return new AuthResponse(token);
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public AppUser register(@RequestBody @Valid RegisterRequest request) {
        Optional<AppUser> existing = appUserRepository.findByUsername(request.getUsername());
        if (existing.isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already exists");
        }
        AppUser user = new AppUser();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(
                request.getRole() == null || request.getRole().isBlank()
                        ? "ROLE_USER"
                        : request.getRole()
        );
        return appUserRepository.save(user);
    }
}


