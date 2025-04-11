package com.launchcode.liftoff.the.bugfest.club.service;

import com.launchcode.liftoff.the.bugfest.club.data.TripRepository;
import com.launchcode.liftoff.the.bugfest.club.data.UserRepository;
import com.launchcode.liftoff.the.bugfest.club.models.Trip;
import com.launchcode.liftoff.the.bugfest.club.models.User;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TripService {

    @Autowired
    private final TripRepository tripRepository;

    @Autowired
    private final UserRepository userRepository;


    public TripService(TripRepository tripRepository, UserRepository userRepository) {
        this.tripRepository = tripRepository;
        this.userRepository = userRepository;
    }

//
    @Transactional
    public Trip saveTripForUser(Long userId, Trip trip) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        trip.setUser(user); // Associate trip with user
        return tripRepository.save(trip);
    }

    public List<Trip> getTripsByUserId(Long userId) {
        return tripRepository.findByUserId(userId);
    }

//    public ResponseEntity<String> createTrip(Trip trip) {
//        // Check if the trip already exists
//        if (tripRepository.existsByStartingLocationAndDaysAndVibe(
//                trip.getStartingLocation(), trip.getDays(), trip.getVibe())) {
//            // Return a ResponseEntity with status 409 Conflict and a message
//            return ResponseEntity.status(HttpStatus.CONFLICT).body("Trip details already exist.");
//        }// Save the trip if no duplicate exists
//        tripRepository.save(trip);
//
//        // Return a ResponseEntity with status 201 Created and success message
//        return ResponseEntity.status(HttpStatus.CREATED).body("Trip created successfully!");
//    }
//
//
//
//    public Iterable<Trip> getAllTrips(){
//        return tripRepository.findAll();
//    }
//
//
//    public List<Location> getLocationsForTrip(String vibe) {
//        Destination destination = destinationRepository.findByVibe(vibe);
//        if (destination != null) {
//            return destination.getLocations();
//        }
//        throw new RuntimeException("No locations found for the vibe: " + vibe);
//    }
//
//    public Trip saveTripForUser(Trip trip, Long userId) {
//        User user = userRepository.findById(userId)
//                .orElseThrow(() -> new RuntimeException("User not found"));
//        trip.setUser(user);
//        return tripRepository.save(trip);
//    }

//    public List<Trip> getTripsByUserId(Long userId) {
//        return tripRepository.findByUserId(userId);
//    }

}