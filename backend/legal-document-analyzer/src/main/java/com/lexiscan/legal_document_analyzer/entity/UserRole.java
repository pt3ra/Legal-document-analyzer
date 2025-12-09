package com.lexiscan.legal_document_analyzer.entity;

import com.lexiscan.legal_document_analyzer.RoleType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name="roles")
public class UserRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long role_id;

    @NotNull
    @Enumerated(EnumType.STRING)
    private RoleType roleName;

    public UserRole(RoleType roleName) {
        this.roleName = roleName;
    }
}
