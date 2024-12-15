//package com.sps.entity;
//
//import jakarta.persistence.*;
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//import org.hibernate.annotations.CreationTimestamp;
//import org.hibernate.annotations.UpdateTimestamp;
//
//import java.sql.Timestamp;
//
//@Entity
//@Table(name = "subjects")
//@Getter
//@Setter
//@AllArgsConstructor
//@NoArgsConstructor
//public class Subject {
//    @Id
//    private String id;
//
//    @ManyToOne
//    @JoinColumn(name = "course_id", nullable = false)
//    private Course course;
//
//    @Column(nullable = false, length = 100)
//    private String name;
//
//    @Column(nullable = false, columnDefinition = "INT DEFAULT 0")
//    private int progress;
//
//    @CreationTimestamp
//    private Timestamp createdAt;
//
//    @UpdateTimestamp
//    private Timestamp updatedAt;
//
//    // Getters and Setters
//}
