package com.launchcode.liftoff.the.bugfest.club.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Destination {
    @Id
    @GeneratedValue
    private String name;
    private String type;
    private List<Location> locations;
    private String description;

}
