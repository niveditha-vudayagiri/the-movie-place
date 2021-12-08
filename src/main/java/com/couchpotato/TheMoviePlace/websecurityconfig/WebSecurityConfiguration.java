package com.couchpotato.TheMoviePlace.websecurityconfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled=true)
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter{

	@Autowired
	private CustomUserDetailsService customUserDetailsService;
	
	@Bean
	AuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider provider=
				new DaoAuthenticationProvider();
		
		
		//User details service
		provider.setUserDetailsService(customUserDetailsService);
		
		//Set password encoder
		provider.setPasswordEncoder(passwordEncoder());
		
		return provider;
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(customUserDetailsService).passwordEncoder(passwordEncoder());
		
		auth.inMemoryAuthentication()
			.withUser("user").password("{noop}pass").roles("USER")
			.and()
			.withUser("admin").password("{noop}admin").roles("ADMIN");
	}

	//URL based security
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable();
		http.cors();
		http.authorizeRequests()
		.antMatchers("/auth**").authenticated()
		.anyRequest().permitAll()
		//.and()
		/*.formLogin()
		.permitAll()
		/*.loginPage("/login.html")
		.loginProcessingUrl("/login")*/
		//.defaultSuccessUrl("/home",true)
		/*.failureUrl("/login.html?error=true")
		//.failureHandler(authenticationFailureHandler())
		.and()
		.logout()
		.logoutUrl("/logout")
		.deleteCookies("JSESSIONID")
		//.logourSuccessHandler(logoutSuccessHandler())*/
		.and()
		.httpBasic();
	}

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
