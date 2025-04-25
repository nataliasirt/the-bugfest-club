package com.launchcode.liftoff.the.bugfest.club.service;

import com.launchcode.liftoff.the.bugfest.club.data.TravelPlanRepository;
import com.launchcode.liftoff.the.bugfest.club.data.TripRepository;
import com.launchcode.liftoff.the.bugfest.club.models.TravelPlan;
import com.launchcode.liftoff.the.bugfest.club.models.Trip;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TripService {

    @Autowired
    private final TripRepository tripRepository;

    @Autowired
    private TravelPlanRepository travelPlanRepository;


    public TripService(TripRepository tripRepository) {
        this.tripRepository = tripRepository;

    }

    public Trip createTrip(Trip trip) {
        return tripRepository.save(trip);
    }

    public TravelPlan saveAIPlan(TravelPlan plan) {
        Trip trip = plan.getTrip();

        if (trip != null) {
            // Save the Trip first (so it has an ID)
            Trip savedTrip = tripRepository.save(trip);

            // Associate the saved trip back to the plan
            plan.setTrip(savedTrip);
        }

        return travelPlanRepository.save(plan);
    }


    public Iterable<TravelPlan> getAllTrips(){
        return travelPlanRepository.findAll();
    }
    public Iterable<TravelPlan> getFavoriteTrips() {
        return travelPlanRepository.findByTripFavoriteTrue();
    }

    public void deleteTrip(Long tripId) {
        Optional<Trip> tripOptional = tripRepository.findById(tripId);
        if (tripOptional.isPresent()) {
            tripRepository.deleteById(tripId);
        } else {
            throw new IllegalArgumentException("Trip with ID " + tripId + " not found");
        }
    }


    public void deleteTravelPlan(Long travelPlanId) {
        Optional<TravelPlan> planOptional = travelPlanRepository.findById(travelPlanId);
        if (!planOptional.isPresent()) {
            throw new IllegalArgumentException("TravelPlan with ID " + travelPlanId + " not found");
        }


        TravelPlan plan = planOptional.get();
        if (plan.getTrip() != null && plan.getTrip().getId() != null) {
            tripRepository.deleteById(plan.getTrip().getId());
        }
        travelPlanRepository.delete(plan);
    }
    public Iterable<TravelPlan> searchTripsByLocation(String location) {
        return travelPlanRepository.findByLocationContainingIgnoreCase(location);
    }
    public Trip toggleFavorite(Long tripId, boolean favorite) {
        Optional<Trip> tripOptional = tripRepository.findById(tripId);
        if (!tripOptional.isPresent()) {
            throw new IllegalArgumentException("Trip with ID " + tripId + " not found");
        }
        Trip trip = tripOptional.get();
        trip.setFavorite(favorite);
        return tripRepository.save(trip);
    }
}