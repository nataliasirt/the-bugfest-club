package com.launchcode.liftoff.the.bugfest.club.security.oauth2;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.stereotype.Component;
import org.springframework.util.Assert;
import org.springframework.util.SerializationUtils;

import java.util.Arrays;
import java.util.Base64;
import java.util.Optional;

@Component
public class HttpCookieOAuth2AuthorizationRequestRepository implements AuthorizationRequestRepository<OAuth2AuthorizationRequest> {

    public static final String OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME = "oauth2_auth_request";
    public static final String REDIRECT_URI_PARAM_COOKIE_NAME = "redirect_uri";
    private static final int cookieExpireSeconds = 180;

    @Override
    public OAuth2AuthorizationRequest loadAuthorizationRequest(HttpServletRequest request) {
        Assert.notNull(request, "request cannot be null");
        return fetchCookie(request)
                .map(this::deserialize)
                .orElse(null);
    }

    @Override
    public void saveAuthorizationRequest(OAuth2AuthorizationRequest authorizationRequest, HttpServletRequest request, HttpServletResponse response) {
        Assert.notNull(request, "request cannot be null");
        Assert.notNull(response, "response cannot be null");

        if (authorizationRequest == null) {
            removeAuthorizationRequest(request, response);
            return;
        }

        Cookie authRequestCookie = new Cookie(OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME, serialize(authorizationRequest));
        authRequestCookie.setPath("/");
        authRequestCookie.setHttpOnly(true);
        authRequestCookie.setMaxAge(cookieExpireSeconds);
        response.addCookie(authRequestCookie);

        // 👉 Add this to save redirect_uri from the request param into a cookie
        String redirectUriAfterLogin = request.getParameter(REDIRECT_URI_PARAM_COOKIE_NAME);
        if (redirectUriAfterLogin != null && !redirectUriAfterLogin.isEmpty()) {
            Cookie redirectUriCookie = new Cookie(REDIRECT_URI_PARAM_COOKIE_NAME, redirectUriAfterLogin);
            redirectUriCookie.setPath("/");
            redirectUriCookie.setMaxAge(cookieExpireSeconds);
            response.addCookie(redirectUriCookie);
        }
    }

    @Override
    public OAuth2AuthorizationRequest removeAuthorizationRequest(HttpServletRequest request, HttpServletResponse response) {
        OAuth2AuthorizationRequest authorizationRequest = loadAuthorizationRequest(request);
        deleteCookie(request, response);
        return authorizationRequest;
    }

    private Optional<Cookie> fetchCookie(HttpServletRequest request) {
        if (request.getCookies() == null) {
            return Optional.empty();
        }
        return Arrays.stream(request.getCookies())
                .filter(cookie -> cookie.getName().equals(OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME))
                .findFirst();
    }

    private void deleteCookie(HttpServletRequest request, HttpServletResponse response) {
        Cookie authRequestCookie = new Cookie(OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME, "");
        authRequestCookie.setPath("/");
        authRequestCookie.setMaxAge(0);
        response.addCookie(authRequestCookie);

        Cookie redirectUriCookie = new Cookie(REDIRECT_URI_PARAM_COOKIE_NAME, "");
        redirectUriCookie.setPath("/");
        redirectUriCookie.setMaxAge(0);
        response.addCookie(redirectUriCookie);
    }

    private String serialize(OAuth2AuthorizationRequest authorizationRequest) {
        return Base64.getUrlEncoder().encodeToString(SerializationUtils.serialize(authorizationRequest));
    }

    private OAuth2AuthorizationRequest deserialize(Cookie cookie) {
        return (OAuth2AuthorizationRequest) SerializationUtils.deserialize(Base64.getUrlDecoder().decode(cookie.getValue()));
    }
}