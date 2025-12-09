package com.lexiscan.legal_document_analyzer.repository;

import com.lexiscan.legal_document_analyzer.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByLogin(String login);

    Optional<User> findByEmail(String email);

    @Query("SELECT u FROM User u WHERE u.login = :identifier OR u.email = :identifier")
    Optional<User> findByLoginOrEmail(@Param("identifier") String identifier);
}
