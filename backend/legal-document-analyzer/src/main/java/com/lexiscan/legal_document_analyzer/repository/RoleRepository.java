package com.lexiscan.legal_document_analyzer.repository;

import com.lexiscan.legal_document_analyzer.RoleType;
import com.lexiscan.legal_document_analyzer.entity.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<UserRole,Long> {

    Optional<UserRole> findByRoleName(RoleType roleName);
}
