package com.launchcode.liftoff.the.bugfest.club.controllers;

import com.launchcode.liftoff.the.bugfest.club.models.Destination;
import com.launchcode.liftoff.the.bugfest.club.service.DestinationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController

@RequestMapping("/destinations")
public class DestinationController {

    @Autowired
    private DestinationService destinationService;

    @PostMapping
    public Destination createDestination(@RequestBody Destination destination) {
        return destinationService.createDestination(destination);
    }


    @GetMapping
    public Iterable<Destination> getAllDestinations() {
        return destinationService.getAllDestinations();
    }

    @GetMapping("/{id}")
    public Optional<Destination> getDestinationById(@PathVariable long id) {
        return destinationService.findDestinationById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteById(@PathVariable long id) {
        destinationService.deleteDestinationById(id);
    }

    @PutMapping("/{id}")
    public Destination updateDestination(@PathVariable long id, @RequestBody Destination editDestination) {
        return destinationService.updateDestinationById(id, editDestination);
    }






}