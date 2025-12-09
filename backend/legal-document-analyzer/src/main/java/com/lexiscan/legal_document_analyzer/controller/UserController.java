package com.lexiscan.legal_document_analyzer.controller;

import com.lexiscan.legal_document_analyzer.dto.LoginRequest;
import com.lexiscan.legal_document_analyzer.dto.LoginResponse;
import com.lexiscan.legal_document_analyzer.dto.SignUpRequest;
import com.lexiscan.legal_document_analyzer.dto.UserNameResponse;
import com.lexiscan.legal_document_analyzer.entity.User;
import com.lexiscan.legal_document_analyzer.jwt.JwtUtils;
import com.lexiscan.legal_document_analyzer.service.UserServiceImpl;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserServiceImpl userServiceImpl;

    private final AuthenticationManager authenticationManager;

    private final JwtUtils jwtUtils;

    public UserController (UserServiceImpl userServiceImpl, AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.userServiceImpl = userServiceImpl;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    @GetMapping("/{login}")
    public ResponseEntity<User> getUserByLogin(@PathVariable String login) {
        Optional<User> user = userServiceImpl.findByLogin(login);
        return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build()); // ---> Replace with DTO
    }

    @PreAuthorize("isAnonymous()")
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication;
        try {
            authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(loginRequest.getIdentifier(), loginRequest.getPassword()));
        } catch (AuthenticationException exception) {
            Map<String, Object> map = new HashMap<>();
            map.put("message", "Bad Credentials");
            map.put("status", false);
            return new ResponseEntity<Object>(map, HttpStatus.NOT_FOUND);
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String jwtToken  = jwtUtils.generateTokenFromUsername(userDetails);

        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .toList();

        // Secure HTTP-only cookie for sending jwt token
        ResponseCookie cookie = ResponseCookie.from("jwtToken", jwtToken)
                .httpOnly(true)
                .secure(true)
                .sameSite("Strict")
                .path("/")
                .maxAge(60 * 15)
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new LoginResponse(jwtToken, userDetails.getUsername(), roles));
    }

    @PreAuthorize("isAnonymous()")
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signUpRequest) {
        User user = new User(signUpRequest.getUsername(), signUpRequest.getPassword(), signUpRequest.getEmail());

        userServiceImpl.saveUser(user);

        return authenticateUser(new LoginRequest(signUpRequest.getUsername(), signUpRequest.getPassword()));
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletResponse response) {
        // Replacing authorization with an expired HTTP-only cookie
        ResponseCookie cookie = ResponseCookie.from("jwtToken", "")
                .httpOnly(true)
                .secure(true)
                .sameSite("Lax")
                .path("/")
                .maxAge(0)
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return ResponseEntity.ok(Map.of("message", "Logged out"));
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping("/user")
    public ResponseEntity<?> userEndpoint() {

        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        return ResponseEntity.ok(new UserNameResponse(userDetails.getUsername()));
    }


    // --------------------------- Test methods ---------------------------
    @GetMapping("/test")
    public void addUser() {
        User user = new User("testLogin1", "testPassword1", "testEmail1@gmail.com");
        userServiceImpl.saveUser(user);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public String adminEndpoint() {
        return "Admin";
    }
}
