package com.launchcode.liftoff.the.bugfest.club.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
public class Trip {
    private List<Destination> destinations;
    private double price;
    private Date startDate;
    private Date endDate;
    private String description;
    private Date createdAt;
    private String imageUrl;
}
