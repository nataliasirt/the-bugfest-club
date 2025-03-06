package com.launchcode.liftoff.the.bugfest.club.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor
public class Favorites {
    //-private User user
    private Trip trip;
    private Date createdAt;
    private Date updatedAt;
}
