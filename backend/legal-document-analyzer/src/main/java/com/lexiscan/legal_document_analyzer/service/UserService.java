package com.lexiscan.legal_document_analyzer.service;

import com.lexiscan.legal_document_analyzer.entity.User;

import java.util.Optional;

public interface UserService {

    Optional<User> findByLogin(String login);

    void saveUser(User user);

    void updateUser(User user);

    void deleteUser(User user);
}
