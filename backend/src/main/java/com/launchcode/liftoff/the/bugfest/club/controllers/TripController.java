package com.launchcode.liftoff.the.bugfest.club.controllers;
import com.launchcode.liftoff.the.bugfest.club.models.TravelPlan;
import com.launchcode.liftoff.the.bugfest.club.models.Trip;
import com.launchcode.liftoff.the.bugfest.club.service.TripService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("/api/trips/")
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


    @PostMapping(value = "/tripPlan", consumes = MediaType.APPLICATION_JSON_VALUE)

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
    @GetMapping("/tripPlans")
    public ResponseEntity<Iterable<TravelPlan>> getAllTripPlans() {
        try {
            log.info("Fetching all trip plans");
            Iterable<TravelPlan> plans = tripService.getAllTrips();
            long count = plans instanceof java.util.Collection ? ((java.util.Collection<?>) plans).size() : 0;
            log.info("Fetched {} trip plans", count);
            return ResponseEntity.ok(plans);
        } catch (Exception e) {
            log.error("Error retrieving trip plans", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/tripPlans/favorites")
    public ResponseEntity<Iterable<TravelPlan>> getFavoriteTripPlans() {
        try {
            log.info("Fetching favorite trip plans");
            Iterable<TravelPlan> plans = tripService.getFavoriteTrips();
            long count = plans instanceof java.util.Collection ? ((java.util.Collection<?>) plans).size() : 0;
            log.info("Fetched {} favorite trip plans", count);
            return ResponseEntity.ok(plans);
        } catch (Exception e) {
            log.error("Error retrieving favorite trip plans", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @GetMapping("/tripPlans/search")
    public ResponseEntity<Iterable<TravelPlan>> searchTripPlans(@RequestParam String location) {
        try {
            log.info("Searching trip plans by location: {}", location);
            Iterable<TravelPlan> plans = tripService.searchTripsByLocation(location);
            List<TravelPlan> planList = new ArrayList<>();
            plans.forEach(planList::add);
            log.info("Found {} trip plans for location: {}", planList.size(), location);
            return ResponseEntity.ok(plans);
        } catch (Exception e) {
            log.error("Error searching trip plans by location: {}", location, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


    @DeleteMapping("/{tripId}")
    public ResponseEntity<Void> deleteTrip(@PathVariable Long tripId) {
        try {
            log.info("Attempting to delete Trip with ID: {}", tripId);
            tripService.deleteTrip(tripId);
            log.info("Successfully deleted Trip with ID: {}", tripId);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            log.error("Trip not found with ID: {}", tripId, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            log.error("Error deleting Trip with ID: {}", tripId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @DeleteMapping("/tripPlans/{travelPlanId}")
    public ResponseEntity<Void> deleteTravelPlan(@PathVariable Long travelPlanId) {
        try {
            log.info("Attempting to delete TravelPlan with ID: {}", travelPlanId);
            tripService.deleteTravelPlan(travelPlanId);
            log.info("Successfully deleted TravelPlan with ID: {}", travelPlanId);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            log.error("TravelPlan not found with ID: {}", travelPlanId, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            log.error("Error deleting TravelPlan with ID: {}", travelPlanId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PostMapping("/{tripId}/favorite")
    public ResponseEntity<Trip> toggleFavorite(@PathVariable Long tripId, @RequestBody FavoriteRequest request) {
        try {
            log.info("Toggling favorite status for Trip with ID: {}", tripId);
            Trip updatedTrip = tripService.toggleFavorite(tripId, request.isFavorite());
            log.info("Successfully updated favorite status for Trip with ID: {}", tripId);
            return ResponseEntity.ok(updatedTrip);
        } catch (IllegalArgumentException e) {
            log.error("Trip not found with ID: {}", tripId, e);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            log.error("Error updating favorite status for Trip with ID: {}", tripId, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Helper class for request body
    static class FavoriteRequest {
        private boolean favorite;

        public boolean isFavorite() {
            return favorite;
        }

        public void setFavorite(boolean favorite) {
            this.favorite = favorite;
        }
    }

}