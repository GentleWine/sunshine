package com.sunshine.alpha.repository;

import com.sunshine.alpha.entity.Remark;
import com.sunshine.alpha.entity.Reply;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RemarkDAO extends JpaRepository<Remark, Integer> {
    List<Remark>findByUserPhoneAndPostContent(String userphone, String postcontent);
}
