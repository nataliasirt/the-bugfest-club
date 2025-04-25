package com.launchcode.liftoff.the.bugfest.club.models;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "travel_plan")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
@AllArgsConstructor
@NoArgsConstructor
public class TravelPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String tripTitle;
    private String location;
    private String description;
    private String bestTimeToVisit;
    private String topActivity;
    private String mainAttraction;
    private String vibeInspiration;

    @OneToOne(cascade = CascadeType.PERSIST, fetch = FetchType.EAGER)
    @JoinColumn(name = "trip_id")
    private Trip trip;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTripTitle() {
        return tripTitle;
    }

    public void setTripTitle(String tripTitle) {
        this.tripTitle = tripTitle;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getBestTimeToVisit() {
        return bestTimeToVisit;
    }

    public void setBestTimeToVisit(String bestTimeToVisit) {
        this.bestTimeToVisit = bestTimeToVisit;
    }

    public String getTopActivity() {
        return topActivity;
    }

    public void setTopActivity(String topActivity) {
        this.topActivity = topActivity;
    }

    public String getMainAttraction() {
        return mainAttraction;
    }

    public void setMainAttraction(String mainAttraction) {
        this.mainAttraction = mainAttraction;
    }

    public String getVibeInspiration() {
        return vibeInspiration;
    }

    public void setVibeInspiration(String vibeInspiration) {
        this.vibeInspiration = vibeInspiration;
    }

    public Trip getTrip() {
        return trip;
    }

    public void setTrip(Trip trip) {
        this.trip = trip;
    }
}