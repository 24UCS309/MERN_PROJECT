import React from "react";

function About() {
  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h2 className="text-center mb-4">About Us</h2>

        <p className="text-muted text-center">
          Welcome to our learning platform! We are committed to providing
          high-quality courses that help students grow their skills and
          achieve their career goals.
        </p>

        <hr />

        <h5>Our Mission</h5>
        <p>
          Our mission is to make education accessible, affordable, and
          effective for everyone. We focus on practical learning and
          real-world applications.
        </p>

        <h5>What We Offer</h5>
        <ul>
          <li>Industry-relevant courses</li>
          <li>Experienced instructors</li>
          <li>Flexible learning schedule</li>
          <li>Career-focused guidance</li>
        </ul>

        <h5>Why Choose Us?</h5>
        <p>
          We believe in learning by doing. Our platform is designed to give
          you hands-on experience and confidence to succeed in the tech
          industry.
        </p>

        <p className="text-center fw-bold mt-4">
          KEEP LEARNING
        </p>
      </div>
    </div>
  );
}

export default About;
