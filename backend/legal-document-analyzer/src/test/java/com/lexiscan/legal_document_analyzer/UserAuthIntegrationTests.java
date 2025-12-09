package com.lexiscan.legal_document_analyzer;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jayway.jsonpath.JsonPath;
import com.lexiscan.legal_document_analyzer.dto.LoginRequest;
import com.lexiscan.legal_document_analyzer.dto.SignUpRequest;
import com.lexiscan.legal_document_analyzer.entity.User;
import com.lexiscan.legal_document_analyzer.service.UserServiceImpl;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
@SpringBootTest
@AutoConfigureMockMvc
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class UserAuthIntegrationTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired ObjectMapper jsonMapper;
    private static final MediaType JSON = MediaType.APPLICATION_JSON;

    @Autowired
    private UserServiceImpl userServiceImpl;

    private static final User TESTUSER = new User("testuser", "passwordExample123", "test@example.com");

    /** TC:1
     * Registering a new user from test data
     * Expected: 200 Success; JSON response includes jwtToken
     */
    @Test
    @Order(1)
    public void shouldRegisterSuccessfully() throws Exception {

        SignUpRequest signUpRequest = new SignUpRequest();
        signUpRequest.setEmail(TESTUSER.getEmail());
        signUpRequest.setPassword(TESTUSER.getPassword());
        signUpRequest.setUsername(TESTUSER.getLogin());

        mockMvc.perform(post("/api/users/signup")
                .contentType(JSON)
                .content(json(signUpRequest)))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.body.jwtToken").exists());
    }

    /** TC:2
     * Authorizing a newly registered user from TC:1
     * Expected: 200 Success; JSON response includes valid: jwtToken, username
     */
    @Test
    @Order(2)
    public void shouldLoginSuccessfully() throws Exception {

        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setIdentifier(TESTUSER.getLogin());
        loginRequest.setPassword(TESTUSER.getPassword());

        mockMvc.perform(post("/api/users/signin")
                        .contentType(JSON)
                        .content(json(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.jwtToken").exists())
                .andExpect(jsonPath("$.username").value("testuser"));
    }

    /** TC:3
     * Extracting jwt token from a successful sign in response
     * Handling accessing jwt-restricted endpoint with valid jwt token
     * Expected: 200 Success
     */
    @Test
    @Order(3)
    public void shouldAllowAccessWithoutJwtToken() throws Exception {
        // 1. Signing in to get a jwt token from response
        LoginRequest loginRequest = new LoginRequest(TESTUSER.getLogin(), TESTUSER.getPassword());

        String loginResponse = mockMvc.perform(post("/api/users/signin")
                        .contentType(JSON)
                        .content(json(loginRequest)))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        String jwt = JsonPath.read(loginResponse, "$.jwtToken");

        // 2. Calling protected endpoint with a valid jwt token
        mockMvc.perform(get("/api/users/user")
                        .header("Authorization", "Bearer " + jwt))
                .andExpect(status().isOk());
    }

    /**
     * Handling authentication with wrong password
     * Expected: 404 Not Found status; message: Bad Credentials
     */
    @Test
    public void shouldNotLoginWithWrongCredentials() throws Exception {

        LoginRequest loginRequest = new LoginRequest(TESTUSER.getLogin(), "WrongPassword");

        mockMvc.perform(post("/api/users/signin")
                        .contentType(JSON)
                        .content(json(loginRequest)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("Bad Credentials"));
    }

    /**
     * Handling authorization with invalid jwt token
     * Expected: 401 Not Authorized
     */
    @Test
    public void shouldRejectInvalidJwtToken() throws Exception {

        mockMvc.perform(get("/api/users/user")
                        .header("Authorization", "Bearer INVALID_JWT_TOKEN"))
                .andExpect(status().isUnauthorized());
    }

    /**
     * Handling accessing jwt-restricted endpoint without jwt token
     * Expected: 401 Not Authorized
     */
    @Test
    public void shouldBlockAccessWithoutJwtToken() throws Exception {

        mockMvc.perform(get("/api/users/user"))
                .andExpect(status().isUnauthorized());
    }

    // Method for simplifying reusability of objectMapper.writeValueAsString function
    private String json(Object o) throws JsonProcessingException {
        return objectMapper.writeValueAsString(o);
    }

    /**
     * Deleting created instances from the database
     * Exception handling: UsernameNotFoundException for TESTUSER.getLogin()
     */
    @AfterAll
    public void CleanInstancesInDB() throws Exception {

        userServiceImpl.deleteUser(TESTUSER);
    }

}
