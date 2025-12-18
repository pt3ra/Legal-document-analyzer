package com.lexiscan.legal_document_analyzer.security;

import com.lexiscan.legal_document_analyzer.entity.User;
import com.lexiscan.legal_document_analyzer.entity.UserRole;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;

public class UserDetailsPrincipal implements UserDetails {

    private final User user;

    public UserDetailsPrincipal(User user) {
        this.user = user;
    }

    @Override
    public Collection<GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();

        //List<UserRole> roles = null;
        UserRole role = user.getRole();
        if (role == null) {
            return Collections.emptyList();
        }

        return Collections.singletonList(
                new SimpleGrantedAuthority(ensureRolePrefix(role.getRoleName().name()))
        );
    }

    private String ensureRolePrefix(String role){
        return role.startsWith("ROLE_") ? role : "ROLE_" + role;
    }

    public Long getId() {
        return this.user.getId();
    }

    @Override
    public String getUsername() {
        return this.user.getLogin();
    }

    @Override
    public String getPassword() {
        return this.user.getPassword();
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.user.isAccountNonExpired();
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.user.isAccountNonLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.user.isCredentialsNonExpired();
    }

    @Override
    public boolean isEnabled() {
        return this.user.isEnabled();
    }

    public User getUser() {
        return user;
    }

}
