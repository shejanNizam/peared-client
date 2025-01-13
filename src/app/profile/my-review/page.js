"use client";

import { useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function MyReview() {
  const reviews = [
    {
      reviewer: "Gazi",
      rating: 5,
      date: "2024-03-08",
      comment:
        "Elisha is just purely exceptional and thoughtful in design and understanding of requirements. Even when the requirements aren’t as polished and professional.",
    },
    {
      reviewer: "Sarah",
      rating: 4,
      date: "2024-03-07",
      comment:
        "Great work overall, but a few areas could have been more polished.",
    },
    {
      reviewer: "John",
      rating: 5,
      date: "2024-03-06",
      comment:
        "Highly professional and creative. Delivered exactly what was needed.",
    },
    {
      reviewer: "Emily",
      rating: 4.5,
      date: "2024-03-05",
      comment: "Very thoughtful design and execution. Loved working with them.",
    },
    {
      reviewer: "Michael",
      rating: 3,
      date: "2024-03-04",
      comment:
        "Work was decent but didn't fully meet the expectations I had set.",
    },
  ];

  const ratingsBreakdown = [50, 20, 15, 11, 5]; // Ratings for 5, 4, 3, 2, 1 stars
  const totalReviews = reviews.length;
  const averageRating = 4.5;

  const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - Math.ceil(rating);

    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={index} style={{ color: "gold", marginRight: "2px" }} />
        ))}
        {halfStar && (
          <FaStarHalfAlt style={{ color: "gold", marginRight: "2px" }} />
        )}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar
            key={index}
            style={{ color: "gold", marginRight: "2px" }}
          />
        ))}
      </div>
    );
  };

  const [selectedReviews, setSelectedReviews] = useState([]);

  const handleCheckboxChange = (index) => {
    setSelectedReviews((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  //   throw new Error("Required");

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h2 style={{ textAlign: "center", color: "green" }}>My Review</h2>
      {/* Average Rating */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <StarRating rating={averageRating} />
        <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          {averageRating}/5
        </p>
        <p>Total Reviews: {totalReviews}</p>
      </div>

      {/* Ratings Breakdown */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        {ratingsBreakdown.map((count, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "200px",
              margin: "auto",
              fontSize: "1rem",
            }}
          >
            <span>{5 - index} Stars:</span>
            <span>{count}</span>
          </div>
        ))}
      </div>

      {/* Review List */}
      <div>
        <h3 style={{ marginBottom: "1rem" }}>All Reviews</h3>
        {reviews.map((review, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "1rem",
              margin: "0.5rem 0",
              borderRadius: "5px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              style={{ marginRight: "1rem" }}
              checked={selectedReviews.includes(index)}
              onChange={() => handleCheckboxChange(index)}
            />
            <div style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <strong>{review.reviewer}</strong>
                <span>{new Date(review.date).toLocaleDateString()}</span>
              </div>
              <StarRating rating={review.rating} />
              <p style={{ marginTop: "0.5rem" }}>{review.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
