package com.lexiscan.legal_document_analyzer.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "password_hash")
    private String password;

    @NotNull
    @Column(unique = true)
    private String login;

    @NotNull
    @Column(unique = true)
    private String email;

    @Column(name="phone_number", unique = true)
    private String phoneNumber;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="role_id")
    private UserRole role;

    // UserDetails related fields
    @Transient
    private boolean isAccountNonExpired = true;
    @Transient
    private boolean isAccountNonLocked = true;
    @Transient
    private boolean isCredentialsNonExpired = true;
    @Transient
    private boolean isEnabled = true;

    public User(String login, String password, String email) {
        this.login = login;
        this.password = password;
        this.email = email;
        this.role = new UserRole();
    }

}
