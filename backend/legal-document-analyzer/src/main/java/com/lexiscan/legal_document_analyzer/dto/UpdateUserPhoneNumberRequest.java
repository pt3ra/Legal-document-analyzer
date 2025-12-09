package com.lexiscan.legal_document_analyzer.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserPhoneNumberRequest {

    @NotBlank(message = "Phone number cannot be blank")
    private String phoneNumber;
}
