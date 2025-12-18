package com.lexiscan.legal_document_analyzer.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserEmailRequest {

    @Email
    @NotBlank(message = "Email cannot be blank")
    private String email;
}
