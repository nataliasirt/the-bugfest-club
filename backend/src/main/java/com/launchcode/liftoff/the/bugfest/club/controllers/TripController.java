package com.launchcode.liftoff.the.bugfest.club.controllers;

import com.launchcode.liftoff.the.bugfest.club.models.Location;
import com.launchcode.liftoff.the.bugfest.club.models.Trip;
import com.launchcode.liftoff.the.bugfest.club.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/trips")
public class TripController {

    @Autowired
    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }
    @PostMapping
    public ResponseEntity<String> createTrip(@RequestBody Trip trip) {
        return tripService.createTrip(trip); // Returning the ResponseEntity from the service
    }
    @GetMapping("/get")
    public Iterable<Trip> getAllTrips(){
        return tripService.getAllTrips();
    }


    @GetMapping("/locations")
    public List<Location> getLocationsByVibe(@RequestParam String vibe) {
        return tripService.getLocationsForTrip(vibe);
    }


}
