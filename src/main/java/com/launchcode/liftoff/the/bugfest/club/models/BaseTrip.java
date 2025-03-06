package com.launchcode.liftoff.the.bugfest.club.models;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@MappedSuperclass
public abstract class BaseTrip {
    @Id
    @GeneratedValue
    private int id;
}
