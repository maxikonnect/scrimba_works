import React, { useState } from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";

export default function Home() {
  const [refs, setRefs] = useState({});

  // Function to scroll to a section
  const scrollToSection = (section) => {
    refs[section]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Header 
        scrollToAbout={() => scrollToSection("about")}
        scrollToServices={() => scrollToSection("services")}
        scrollToTestimonial={() => scrollToSection("testimonial")}
      />

      <Main scrollToRefs={setRefs} />

      <Footer />
    </>
  );
}
