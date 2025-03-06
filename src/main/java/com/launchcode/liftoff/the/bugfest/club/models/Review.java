package com.launchcode.liftoff.the.bugfest.club.models;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Review {
    //    private User user;
    private Trip trip;
    private String text;
    private int rating;
    private Date reviewDate;
    private List<String> photoUrl;
}
