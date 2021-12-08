package com.couchpotato.TheMoviePlace.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.couchpotato.TheMoviePlace.model.Role;

public interface RoleRepository extends JpaRepository<Role,Long>{

}
