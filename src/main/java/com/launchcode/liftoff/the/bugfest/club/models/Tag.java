package com.launchcode.liftoff.the.bugfest.club.models;

import jakarta.persistence.Entity;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Tag {
    private String name;
    private List<Trip> trips;
}
