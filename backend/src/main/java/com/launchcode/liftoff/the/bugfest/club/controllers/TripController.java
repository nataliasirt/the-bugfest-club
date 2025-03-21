package com.launchcode.liftoff.the.bugfest.club.controllers;

import com.launchcode.liftoff.the.bugfest.club.models.Trip;
import com.launchcode.liftoff.the.bugfest.club.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/trips")
public class TripController {

    @Autowired
    private TripService tripService;

    @PostMapping
    public ResponseEntity<Trip> saveTrip(@RequestBody Trip trip) {
        Trip savedTrip = tripService.saveTrip(trip);
        return new ResponseEntity<>(savedTrip, HttpStatus.CREATED);
    }

}
