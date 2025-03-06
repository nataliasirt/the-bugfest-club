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
public class TripCategory {
private String name;
private String description;
private String imageUrl;
private Date createdAt;
private Date updatedAt;

}
