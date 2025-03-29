package com.launchcode.liftoff.the.bugfest.club.service;


import com.launchcode.liftoff.the.bugfest.club.data.DestinationRepository;
import com.launchcode.liftoff.the.bugfest.club.data.TripRepository;
import com.launchcode.liftoff.the.bugfest.club.models.Destination;
import com.launchcode.liftoff.the.bugfest.club.models.Location;
import com.launchcode.liftoff.the.bugfest.club.models.Trip;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TripService {

    @Autowired
    private final TripRepository tripRepository;

    @Autowired
    private final DestinationRepository destinationRepository;


    public TripService(TripRepository tripRepository, DestinationRepository destinationRepository) {
        this.tripRepository = tripRepository;
        this.destinationRepository = destinationRepository;
    }

    public ResponseEntity<String> createTrip(Trip trip) {
        // Check if the trip already exists
        if (tripRepository.existsByStartingLocationAndDaysAndVibe(
                trip.getStartingLocation(), trip.getDays(), trip.getVibe())) {
            // Return a ResponseEntity with status 409 Conflict and a message
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Trip details already exist.");
        }// Save the trip if no duplicate exists
        tripRepository.save(trip);

        // Return a ResponseEntity with status 201 Created and success message
        return ResponseEntity.status(HttpStatus.CREATED).body("Trip created successfully!");
    }



    public Iterable<Trip> getAllTrips(){
        return tripRepository.findAll();
    }


    public List<Location> getLocationsForTrip(String vibe) {
        Destination destination = destinationRepository.findByVibe(vibe);
        if (destination != null) {
            return destination.getLocations();
        }
        throw new RuntimeException("No locations found for the vibe: " + vibe);
    }

}
