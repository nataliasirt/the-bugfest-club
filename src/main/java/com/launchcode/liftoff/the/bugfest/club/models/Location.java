package com.launchcode.liftoff.the.bugfest.club.models;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class Location {
    private String city;
    private String description;
}
