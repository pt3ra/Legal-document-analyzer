package com.lexiscan.legal_document_analyzer.service;

import com.lexiscan.legal_document_analyzer.RoleType;
import com.lexiscan.legal_document_analyzer.entity.User;
import com.lexiscan.legal_document_analyzer.repository.RoleRepository;
import com.lexiscan.legal_document_analyzer.repository.UserRepository;
import com.lexiscan.legal_document_analyzer.security.UserDetailsPrincipal;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // REQUIRED by Spring Security method
    @Override
    public UserDetails loadUserByUsername(String identifier) throws UsernameNotFoundException {
        User user = findUser(identifier);

        return new UserDetailsPrincipal(user);
    }

    @Override
    @Transactional(readOnly = true)
    public User findByLogin(String login) {
        return userRepository.findByLogin(login)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + login));
    }

    @Transactional(readOnly = true)
    public User findUser(String identifier) {
        return userRepository.findByLoginOrEmail(identifier)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + identifier));
    }

    @Transactional(readOnly = true)
    public User findUser(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found by id: " + id));
    }

    private String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    public void saveUser(User user) {
        user.setPassword(encodePassword(user.getPassword()));

        user.setRole(roleRepository.findByRoleName(RoleType.USER)  // Set default role USER
                .orElseThrow(() -> new IllegalStateException("Default role USER not found in the database")));

        userRepository.save(user);
    }

    public void updateEmail(Long id, String email) {
        User user = findUser(id);

        user.setEmail(email);
        userRepository.save(user);
    }

    public void updatePhoneNumber(Long id, String phoneNumber) {
        User user = findUser(id);

        user.setPhoneNumber(phoneNumber);
        userRepository.save(user);
    }

    public void changePassword(Long id, String oldPassword, String newPassword) {
        User user = findUser(id);

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new BadCredentialsException("Old password is incorrect");
        }

        user.setPassword(encodePassword(newPassword));
        userRepository.save(user);
    }


    public void deleteUser(User user) {
        userRepository.delete(findByLogin(user.getLogin()));
    }
}
