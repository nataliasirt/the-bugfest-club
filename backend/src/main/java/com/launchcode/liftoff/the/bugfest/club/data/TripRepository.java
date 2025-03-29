package com.launchcode.liftoff.the.bugfest.club.data;

import com.launchcode.liftoff.the.bugfest.club.models.Trip;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripRepository extends CrudRepository<Trip, Long> {

//    @Query("SELECT COUNT(t) > 0 FROM Trip t WHERE t.startingLocation = :startingLocation AND t.budget = :budget AND t.vibe = :vibe AND t.days = :days")
//    boolean existsTrip(@Param("startingLocation") String startingLocation,
//                       @Param("budget") double budget,
//                       @Param("vibe") String vibe,
//                       @Param("days") int days);

    boolean existsByStartingLocationAndDaysAndVibe(String startingLocation, int days, String vibe);
}
