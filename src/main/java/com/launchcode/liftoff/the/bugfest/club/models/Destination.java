package com.launchcode.liftoff.the.bugfest.club.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="destination")
public class Destination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String country;
    private String region;
    private String description;
    private String imageUrl;

    @OneToMany(mappedBy = "destination",cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Location> locations = new ArrayList<>();

    public void setLocations(List<Location> locations) {
        for (Location location : locations) {
            location.setDestination(this);
        }
        this.locations = locations;
    }
}
