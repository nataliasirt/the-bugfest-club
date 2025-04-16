package com.launchcode.liftoff.the.bugfest.club.controllers;

import com.launchcode.liftoff.the.bugfest.club.models.TravelPlan;
import com.launchcode.liftoff.the.bugfest.club.models.Trip;
import com.launchcode.liftoff.the.bugfest.club.service.TripService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

       @PostMapping
       public Trip createTrip(@RequestBody Trip trip){
        return tripService.createTrip(trip);
}

   @PostMapping("/tripPlan")
    public ResponseEntity<TravelPlan> saveAIPlan(@RequestBody TravelPlan plan) {
        try {
            if (plan.getTrip() == null) {
                return ResponseEntity.badRequest().build(); // No Trip info provided
            }

            TravelPlan savedPlan = tripService.saveAIPlan(plan);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPlan);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

}