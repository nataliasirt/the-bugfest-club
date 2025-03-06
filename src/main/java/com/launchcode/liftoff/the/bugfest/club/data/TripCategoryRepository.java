package com.launchcode.liftoff.the.bugfest.club.data;

import com.launchcode.liftoff.the.bugfest.club.models.Location;
import com.launchcode.liftoff.the.bugfest.club.models.TripCategory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripCategoryRepository extends CrudRepository<TripCategory,Integer> {
}
