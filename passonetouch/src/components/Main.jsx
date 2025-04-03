import React, { useRef } from "react";

export default function Main({ scrollToRefs }) {
  
  const aboutRef = useRef(null);
  const servicesRef = useRef(null);
  const testimonialRef = useRef(null);

  
  React.useEffect(() => {
    if (scrollToRefs) {
      scrollToRefs({
        about: aboutRef,
        services: servicesRef,
        testimonial: testimonialRef,
      });
    }
  }, [scrollToRefs]);

  return (
    <main>
      {/* About Section */}
      <section ref={aboutRef} id="about" style={{marginTop: "400px"}}>
        <h2>About Us</h2>
        <p>Learn more about us.</p>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} id="services" style={{marginTop: "400px"}}>
        <h2>Our Services</h2>
        <p>What we offer.</p>
      </section>

      {/* Testimonial Section */}
      <section ref={testimonialRef} id="testimonial" style={{marginTop: "400px"}}>
        <h2>Testimonial</h2>
        <p>What our customers say.</p>
      </section>
    </main>
  );
}
