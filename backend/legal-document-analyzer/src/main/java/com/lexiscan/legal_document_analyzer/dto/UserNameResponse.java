package com.lexiscan.legal_document_analyzer.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserNameResponse {

    private String username;

    public UserNameResponse(String username) {
        this.username = username;
    }

}
