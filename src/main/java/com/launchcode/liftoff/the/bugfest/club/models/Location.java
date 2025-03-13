package com.launchcode.liftoff.the.bugfest.club.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="location")
public class Location {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String city;
    private String description;
    private String imageUrl;
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "destination_id",referencedColumnName = "id",nullable = false)
    private Destination destination;
}
