package com.launchcode.liftoff.the.bugfest.club.controllers;

import com.launchcode.liftoff.the.bugfest.club.models.Trip;
import com.launchcode.liftoff.the.bugfest.club.service.TripService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/trips")
@Slf4j
public class TripController {

    @Autowired
    private final TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }


    @PostMapping("/user/{userId}")
    public ResponseEntity<Trip> createTripForUser(@PathVariable Long userId, @RequestBody Trip trip) {
        log.info("Inside createTripForUser method in TripController class");
        Trip savedTrip = tripService.saveTripForUser(userId, trip);
        return ResponseEntity.ok(savedTrip);
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Trip>> getTripsByUserId(@PathVariable Long userId) {
        List<Trip> trips = tripService.getTripsByUserId(userId);
        return ResponseEntity.ok(trips);
    }


//
//    @PostMapping("/trips")
//    public ResponseEntity<String> createTrip(@RequestBody Trip trip) {
//        return tripService.createTrip(trip); // Returning the ResponseEntity from the service
//    }
//
//    @GetMapping("/trips")
//    public Iterable<Trip> getAllTrips(){
//        return tripService.getAllTrips();
//    }
//
//
//    @GetMapping("/locations")
//    public List<Location> getLocationsByVibe(@RequestParam String vibe) {
//        return tripService.getLocationsForTrip(vibe);
//    }


}