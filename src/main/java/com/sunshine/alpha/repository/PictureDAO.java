package com.sunshine.alpha.repository;

import com.sunshine.alpha.entity.Picture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PictureDAO extends JpaRepository<Picture, Integer> {
}
