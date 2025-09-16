import { Container } from "react-bootstrap";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import portfolio from "../assets/img/portfolio.png";
import { FaGithub } from "react-icons/fa";
import robocar from "../assets/img/robocar.png";
import writer from "../assets/img/writer.png";
import expense from "../assets/img/expense.png";
import chess from "../assets/img/chess.png";

export const Project = () => {
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

  // Trigger animation when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && scrollDirection === "down") {
          controls.start("visible"); // animate on scroll down
        } else if (entry.isIntersecting && scrollDirection === "up") {
          controls.set("visible"); // instantly show on scroll up
        }
      },
      { threshold: 0.2 } // trigger as soon as it enters viewport
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [scrollDirection, controls]);

  // Motion Variants
  const headingVariant = {
    hidden: { opacity: 0, y: 50 }, // from bottom
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.3, ease: "easeOut" },
    }),
  };

  const projects = [
    { img: writer, title: "Writer's Haven", text: "Web-based social platform that enables writers to create, share, and manage posts with customizable privacy settings, connect with other writers through follows, bookmarks, and profile interactions, and build a creative community.", tags: ["#react", "#nodejs", "#mongodb"] },
    // { img: portfolio, title: "DevPortfolio", text: "My portfolio showcases my skills in web development , ability to design and build scalable, efficient, and user-friendly solutions. From developing responsive websites with modern front-end technologies to creating back-end systems and working with databases.", tags: ["#react", "#bootstrap", "#nodejs"] },
    { img: expense, title: "Expense Management", text: "It enables users to track income and expenses with full CRUD functionality, filter records by custom date ranges, and categorize transactions for accurate budgeting and forecasting", tags: ["#react", "#nodejs", "#mongodb"] },
    { img: chess, title: "Chess Pairing webApp", text: "Web-based chess pairing application that allows users to create tournaments, add rounds, generate player pairings, and display live scores, providing a seamless way to manage and track tournament progress.", tags: ["#javascript", "#react", "#NewsAPI"] },
    { img: robocar, title: "Robotic Car", text: "Voice-controlled robotic car programmed with ESP32 IDE and integrated with Blynk Cloud and Google Assistant, enabling hands-free navigation through natural voice commands via smartphone.", tags: ["#arduino IDE", "#blynk app", "#IFTTT"] },
  ];

  return (
    <section className="project" id="project" ref={sectionRef}>
      {/* Animate Headings */}
      <motion.h6 variants={headingVariant} initial="hidden" animate={controls}>
        What I have done so far
      </motion.h6>

      <motion.h4 variants={headingVariant} initial="hidden" animate={controls}>
        Projects
      </motion.h4>

      <Container>
        <div className="row">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className="col-sm-4"
              custom={i}
              variants={cardVariant}
              initial="hidden"
              animate={controls}
            >
              <div className="card">
                <img className="card-img-top" src={project.img} alt={project.title} />
                <div className="card-img-overlay">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <FaGithub />
                  </a>
                </div>
                <div className="card-body">
                  <h5 className="card-title">{project.title}</h5>
                  <p className="card-text">{project.text}</p>
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className={`card-hashtag${idx + 1}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
