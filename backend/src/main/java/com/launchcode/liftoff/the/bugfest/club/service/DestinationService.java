package com.launchcode.liftoff.the.bugfest.club.service;

import com.launchcode.liftoff.the.bugfest.club.data.DestinationRepository;
import com.launchcode.liftoff.the.bugfest.club.data.LocationRepository;
import com.launchcode.liftoff.the.bugfest.club.models.Destination;
import com.launchcode.liftoff.the.bugfest.club.models.Location;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DestinationService {

    @Autowired
    private DestinationRepository destinationRepository;
    @Autowired
    private LocationRepository locationRepository;

    public Destination createDestination(Destination destination) {
        if (destination.getLocations() != null) {
            destination.setLocations(destination.getLocations()); //
        }
        return destinationRepository.save(destination);
    }

    public Iterable<Destination> getAllDestinations() {
        return destinationRepository.findAll();
    }

    public Optional<Destination> findDestinationById(long id) {
        return destinationRepository.findById(id);
    }

    public void deleteDestinationById(long id) {
        Optional<Destination> results = destinationRepository.findById(id);
        if (results.isEmpty()) {
            throw new EntityNotFoundException("Destination not found with id" + id);
        }
        Destination destination = results.get();
        destinationRepository.delete(destination);
    }

    public Destination updateDestinationById(long id, Destination editDestination) {
        Optional<Destination> results = destinationRepository.findById(id);

        if (results.isEmpty()) {
            throw new EntityNotFoundException("Destination not found with id: " + id);
        }
        Destination destination = results.get();
        if (editDestination.getLocations() != null) {
            destination.getLocations().clear(); // Remove old locations
            destination.getLocations().addAll(editDestination.getLocations()); // Add new locations
            for (Location location : destination.getLocations()) {
                location.setDestination(destination); // Set the bidirectional relationship
            }
        }

        return destinationRepository.save(destination);
    }


}

