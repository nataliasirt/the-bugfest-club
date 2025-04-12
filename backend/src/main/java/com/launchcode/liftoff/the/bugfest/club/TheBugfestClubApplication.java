package com.launchcode.liftoff.the.bugfest.club;

import com.launchcode.liftoff.the.bugfest.club.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties(AppProperties.class)
@SpringBootApplication
public class TheBugfestClubApplication {

    public static void main(String[] args) {
        SpringApplication.run(TheBugfestClubApplication.class, args);
    }

}
