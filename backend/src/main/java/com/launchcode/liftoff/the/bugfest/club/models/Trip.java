package com.launchcode.liftoff.the.bugfest.club.models;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "trip")
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String startingLocation;
    private String budget;
    private String vibe;
    private int days;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id") // The column in the 'trip' table that references 'user'
    private User user;
    @OneToOne(mappedBy = "trip", cascade = CascadeType.PERSIST, orphanRemoval = true)
    @JsonManagedReference
    private TravelPlan travelPlan;
}


