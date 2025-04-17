package com.launchcode.liftoff.the.bugfest.club.service;

import com.launchcode.liftoff.the.bugfest.club.data.TravelPlanRepository;
import com.launchcode.liftoff.the.bugfest.club.data.TripRepository;
import com.launchcode.liftoff.the.bugfest.club.data.UserRepository;
import com.launchcode.liftoff.the.bugfest.club.models.TravelPlan;
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

    @Autowired
    private TravelPlanRepository travelPlanRepository;


    public TripService(TripRepository tripRepository, UserRepository userRepository) {
        this.tripRepository = tripRepository;
        this.userRepository = userRepository;
    }

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

    public TravelPlan saveAIPlan(TravelPlan plan) {
        if (plan.getTrip() != null && plan.getTrip().getId() == null) {
            Trip savedTrip = tripRepository.save(plan.getTrip());
            plan.setTrip(savedTrip); // Make sure the plan has a managed trip with ID
        }

        return travelPlanRepository.save(plan);
    }

    public Iterable<TravelPlan> getAllTrips(){
        return travelPlanRepository.findAll();
    }

}