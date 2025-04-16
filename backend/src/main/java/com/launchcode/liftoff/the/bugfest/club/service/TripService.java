package com.launchcode.liftoff.the.bugfest.club.service;

import com.launchcode.liftoff.the.bugfest.club.data.TravelPlanRepository;
import com.launchcode.liftoff.the.bugfest.club.data.TripRepository;
import com.launchcode.liftoff.the.bugfest.club.models.TravelPlan;
import com.launchcode.liftoff.the.bugfest.club.models.Trip;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

}