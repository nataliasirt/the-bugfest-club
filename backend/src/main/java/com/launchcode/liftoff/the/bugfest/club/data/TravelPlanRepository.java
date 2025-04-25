package com.launchcode.liftoff.the.bugfest.club.data;
import com.launchcode.liftoff.the.bugfest.club.models.TravelPlan;
import com.launchcode.liftoff.the.bugfest.club.models.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TravelPlanRepository extends JpaRepository<TravelPlan, Long> {
    Optional<TravelPlan> findByTrip(Trip trip);
    Iterable<TravelPlan> findByLocationContainingIgnoreCase(String location);
    Iterable<TravelPlan> findByTripFavoriteTrue();
}
