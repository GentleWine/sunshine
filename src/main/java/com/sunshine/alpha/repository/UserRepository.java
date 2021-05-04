package com.sunshine.alpha.repository;

import com.sunshine.alpha.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User,Integer> {

    List<User> findByEmailAndPassword(String email,String password);
    List<User> findByPhoneAndPassword(String phone,String password);
    List<User> findByPhone(String phone);
    List<User> findByEmail(String email);
}
