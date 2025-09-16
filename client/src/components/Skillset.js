import { Container } from "react-bootstrap";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import html from "../assets/img/html.png";
import css from "../assets/img/css.png";
import js from "../assets/img/js.png";
import node from "../assets/img/node.png";
import react from "../assets/img/react.png";
import redux from "../assets/img/redux.png";
import tailwind from "../assets/img/tailwind.png";
import git from "../assets/img/git.png";
import cpp from "../assets/img/c++.png";
import mongodb from "../assets/img/mongodb.png";
import sql from "../assets/img/sql.png";
import bootstrap from "../assets/img/bootstrap.png";
import typescript from "../assets/img/typescript.png";
import python from "../assets/img/python.png";

export const Skillset = () => {
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

  // Trigger animation only when scrolling down
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && scrollDirection === "down") {
          controls.start("visible");
        } else if (entry.isIntersecting && scrollDirection === "up") {
          controls.set("visible"); 
        }
      } , { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [scrollDirection, controls]);

  // Motion variants
  const headingVariant = {
    hidden: { opacity: 0, y: 50 }, // from bottom
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  const paragraphVariant = {
    hidden: { opacity: 0, y: 30 }, // from bottom
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.5, ease: "easeOut" } },
  };

  const cardVariant = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
  };

  const techs = [
    { img: html, name: "HTML 5" },
    { img: css, name: "CSS 3" },
    { img: js, name: "JavaScript" },
    { img: typescript, name: "Typescript" },
    { img: node, name: "Node Js" },
    { img: react, name: "React Js" },
    { img: redux, name: "Redux" },
    { img: tailwind, name: "Tailwind CSS" },
    { img: bootstrap, name: "Bootstrap" },
    { img: sql, name: "SQL" },
    { img: mongodb, name: "MongoDB" },
    { img: git, name: "Git" },
   
    { img: cpp, name: "C++" },
    { img: python, name: "Python" }
    
  ];

  return (
    <section className="skillset" id="skillset" ref={sectionRef}>
      {/* Heading & Paragraph Animation */}
      <motion.h6 variants={headingVariant} initial="hidden" animate={controls}>
        Technologies | use
      </motion.h6>

      <motion.h4 variants={headingVariant} initial="hidden" animate={controls}>
        Technologies
      </motion.h4>

      <motion.p variants={paragraphVariant} initial="hidden" animate={controls}>
        I have experience with a wide range of technologies in digital world. Here are some of the technologies I use.
      </motion.p>

      <Container>
      <div className="row g-3">
        {techs.map((tech, i) => (
          <motion.div
            key={i}
            className="col-6 col-sm-4 col-md-3 col-lg-2"
            custom={i}
            variants={cardVariant}
            initial="hidden"
            animate={controls}
          >
            <div className="card">
              <img src={tech.img} className="card-img-top" alt={tech.name} />
              <div className="card-body">
                <h6 className="card-text">{tech.name}</h6>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Container>

    </section>
  );
};
