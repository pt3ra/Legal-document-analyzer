package com.lexiscan.legal_document_analyzer.service;

import com.lexiscan.legal_document_analyzer.entity.User;

import java.util.Optional;

public interface UserService {

    User findByLogin(String login);

    User findUser(String identifier);

    User findUser(Long id);

    void saveUser(User user);

    void updateEmail(String username, String email);

    void updatePhoneNumber(String username, String phoneNumber);

    void changePassword(String username, String oldPassword, String newPassword);

    void deleteUser(User user);
}
