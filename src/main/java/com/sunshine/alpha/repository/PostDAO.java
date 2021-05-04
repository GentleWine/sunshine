package com.sunshine.alpha.repository;

import com.sunshine.alpha.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PostDAO extends JpaRepository<Post, Integer> {
    Page<Post> findAllByUserPhoneAndType(String phone, boolean type,Pageable pageable);
}
