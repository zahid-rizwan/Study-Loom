package com.sps.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.Date;

/**
 * Represents a user entity in the system.
 * This class is mapped to the "users" table in the database.
 */
@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    /**
     * The unique identifier for the user.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    /**
     * The name of the user.
     * This field cannot be null and has a maximum length of 100 characters.
     */
    @Column(nullable = false, length = 100)
    private String name;

    /**
     * The email address of the user.
     * This field cannot be null, must be unique, and has a maximum length of 100 characters.
     */
    @Column(nullable = false, unique = true, length = 100)
    private String email;

    /**
     * The hashed password of the user.
     * This field cannot be null and has a maximum length of 255 characters.
     */
    @Column(name = "password", nullable = false, length = 255)
    private String password;

    /**
     * The student ID of the user.
     * This field cannot be null, must be unique, and has a maximum length of 50 characters.
     */
//    @Column(name = "student_id", nullable = false, unique = true, length = 50)
//    private String studentId;
//
//    /**
//     * The academic program the user is enrolled in.
//     * This field cannot be null and has a maximum length of 100 characters.
//     */
//    @Column(nullable = false, length = 100)
//    private String program;
//
//    /**
//     * The current semester of the user.
//     * This field cannot be null.
//     */
//    @Column(nullable = false)
//    private int semester;
//
//    /**
//     * The date when the user joined the system.
//     * This field cannot be null.
//     */
//    @Column(name = "join_date", nullable = false)
//    private Date joinDate;
//
//    /**
//     * The phone number of the user.
//     * This field has a maximum length of 20 characters.
//     */
//    @Column(length = 20)
//    private String phone;
//
//    /**
//     * The address of the user.
//     * This field is stored as TEXT in the database.
//     */
//    @Column(columnDefinition = "TEXT")
//    private String address;
//
//    /**
//     * The biography or additional information about the user.
//     * This field is stored as TEXT in the database.
//     */
//    @Column(columnDefinition = "TEXT")
//    private String bio;
//
//    /**
//     * The timestamp when the user record was created.
//     * This field is automatically set by Hibernate.
//     */
//    @CreationTimestamp
//    private Timestamp createdAt;
//
//    /**
//     * The timestamp when the user record was last updated.
//     * This field is automatically updated by Hibernate.
//     */
//    @UpdateTimestamp
//    private Timestamp updatedAt;
}

