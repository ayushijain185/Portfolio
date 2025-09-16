import { Container } from "react-bootstrap";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";

export const Education = () => {
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const [scrollDirection, setScrollDirection] = useState("down");

  // Track scroll direction
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY ? "down" : "up");
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Trigger animation when section enters viewport from top
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && scrollDirection === "down") {
          controls.start("visible");
        } else if (entry.isIntersecting && scrollDirection === "up") {
          controls.set("visible"); // instantly show when scrolling up
        }
      },
      { threshold: 0.2 } // trigger as soon as element enters viewport
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [scrollDirection, controls]);

  const headingVariant = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const paragraphVariant = {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const cardVariant = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  const educationData = [
    {
      year: "2021 - 2025",
      title: "Bachelor in Computer Science (BTech)",
      college: "Gyan Ganga Institute of Technology and Sciences",
      location: "Jabalpur , Madhya Pradesh",
      result: "CGPA : 8.26",
    },
    {
      year: "2020 - 2021",
      title: "12th Central Board of Education",
      college: "Pratibhasthali Gyanodaya VidhyaPeeth",
      location: "Ramtek , Nagpur , Maharashtra",
      result: "Percentage : 82%",
    },
    {
      year: "2018 - 2019",
      title: "10th Central Board of Education",
      college: "Pratibhasthali Gyanodaya VidhyaPeeth",
      location: "Ramtek , Nagpur , Maharashtra",
      result: "Percentage : 87%",
    },
  ];

  return (
    <section className="education" id="education" ref={sectionRef}>
      <motion.h4 variants={headingVariant} initial="hidden" animate={controls}>
        MY LEARNING JOURNEY
      </motion.h4>

      <motion.h1 variants={headingVariant} initial="hidden" animate={controls}>
        Education
      </motion.h1>

      <motion.p variants={paragraphVariant} initial="hidden" animate={controls}>
        I hold a Bachelor's degree in Computer Science with a specialization in the Internet of
        Things (IoT), which provided me with a strong foundation in programming, web development,
        and IoT technologies. Through hands-on projects and coursework, I developed essential
        technical and problem-solving skills, gaining a deep understanding of connected systems and
        their real-world applications.
      </motion.p>

      <Container>
        <div className="row">
          {educationData.map((edu, i) => (
            <motion.div
              className="col-sm-6"
              key={i}
              variants={cardVariant}
              custom={i}
              initial="hidden"
              animate={controls}
            >
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title">{edu.year}</h6>
                  <h5 className="card-subtitle mb-2 text-muted">{edu.title}</h5>
                  <p className="card-text">{edu.college}</p>
                  <p className="card-text">{edu.location}</p>
                  <span>{edu.result}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
