package com.prashant.restwebservicese.restfulwebservices.basic.auth;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;


@Configuration
@EnableWebSecurity
public class SpringSecurityConfigurationBasicAuth extends WebSecurityConfigurerAdapter {
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		//http.formLogin(); // we don't want form login right now hence we have disabled it for now .
		http.csrf().disable().// it will force out Post and put request to have something called as csrf token, it is by default 
		// enable hence we will .disable() it as will not be using csrf tokens but we will be using jwt token.
		authorizeRequests().
		antMatchers(HttpMethod.OPTIONS,"/**").permitAll().	// this will allow any url of option type to be Processed instead of blocking it.
        anyRequest().authenticated()
        .and().
        httpBasic(); // and rest of the methods that is post,put,delete and get need to be authenticated using http basic authentication.
	}
}
