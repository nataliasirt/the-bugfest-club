package com.launchcode.liftoff.the.bugfest.club.data;

import com.launchcode.liftoff.the.bugfest.club.models.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DestinationRepository extends CrudRepository<Destination,Long> {
}
