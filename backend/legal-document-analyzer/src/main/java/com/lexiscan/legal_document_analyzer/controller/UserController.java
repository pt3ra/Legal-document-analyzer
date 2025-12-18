package com.lexiscan.legal_document_analyzer.controller;

import com.lexiscan.legal_document_analyzer.dto.*;
import com.lexiscan.legal_document_analyzer.entity.User;
import com.lexiscan.legal_document_analyzer.jwt.JwtUtils;
import com.lexiscan.legal_document_analyzer.security.UserDetailsPrincipal;
import com.lexiscan.legal_document_analyzer.service.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
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
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    private final AuthenticationManager authenticationManager;

    private final JwtUtils jwtUtils;

    @Value("${spring.app.cookieExpiration}")
    private int cookieExpiration;

    public UserController (UserService userService, AuthenticationManager authenticationManager, JwtUtils jwtUtils) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
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
                .maxAge(cookieExpiration)
                .build();

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new LoginResponse(jwtToken, userDetails.getUsername(), roles));
    }

    @PreAuthorize("isAnonymous()")
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest signUpRequest) {
        User user = new User(signUpRequest.getUsername(), signUpRequest.getPassword(), signUpRequest.getEmail());

        userService.saveUser(user);

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

    /** USER DETAILS UPDATE METHODS FOR THE AUTHENTICATED USER
     *
     */

    @PreAuthorize("hasRole('USER')")
    @PatchMapping("/email") // CHANGE TO POST IF SENDING VERIFICATION EMAILS
    public ResponseEntity<?> updateUserEmail(@AuthenticationPrincipal UserDetailsPrincipal principal, @RequestBody UpdateUserEmailRequest updateUserEmailRequest) {
        userService.updateEmail(principal.getId(), updateUserEmailRequest.getEmail());
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasRole('USER')")
    @PatchMapping("/phone")
    public ResponseEntity<?> updateUserPhoneNumber(@AuthenticationPrincipal UserDetailsPrincipal principal, @RequestBody UpdateUserPhoneNumberRequest updateUserPhoneNumberRequest) {
        userService.updatePhoneNumber(principal.getId(), updateUserPhoneNumberRequest.getPhoneNumber());
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasRole('USER')")
    @PatchMapping("/changePassword")
    public ResponseEntity<?> changePassword(@AuthenticationPrincipal UserDetailsPrincipal principal, @RequestBody ChangePasswordRequest changePasswordRequest) {
        userService.changePassword(principal.getId(), changePasswordRequest.getOldPassword(), changePasswordRequest.getNewPassword());
        return ResponseEntity.ok().build();
    }

    /** USER DETAILS UPDATE METHODS FOR THE ADMIN
     *
     */

    // --------------------------- Test methods ---------------------------

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/admin")
    public String adminEndpoint() {
        return "Admin";
    }
}
