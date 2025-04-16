package com.launchcode.liftoff.the.bugfest.club.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class TravelPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Or another generation strategy
    private Long id;
    private String tripTitle;
    private String location;
    private String description;
    private String bestTimeToVisit;
    private String topActivity;
    private String mainAttraction;
    private String vibeInspiration;
    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "trip_id")
    @JsonBackReference
    private Trip trip;
}
