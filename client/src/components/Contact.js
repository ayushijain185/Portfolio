import { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import emailjs from "@emailjs/browser";

export const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const controls = useAnimation();
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        controls.start("visible");
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, controls]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Ayushi Jain",
          from_email: form.email,
          to_email: "aj575311@gmail.com",
          message: form.message,
        },
        
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          setLoading(false);
          console.error(error);
          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  const sectionVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
     <section className="contact" id="contact" >
      <motion.div
        initial="hidden"
        animate={controls}
        variants={sectionVariant}
      >
        <div >
          <h6>Feel Free To Reach</h6>
          <h5 >Contact Us</h5>
          <p >
            I'm seeking opportunities as a <strong>MERN Stack Developer</strong>{" "}
            where I can contribute my skills and grow professionally. If you're
            hiring, feel free to reach out!
          </p>

          <div className="contact-details">
            <p><strong>Email:</strong></p>
            <span>aj575311@gmail.com</span>
          </div>
          <div className="contact-details">
            <p><strong>Phone:</strong></p>
            <span>+91 9109879633</span>
          </div>
          <div className="contact-details">
            <p><strong>Address:</strong></p>
            <span>Pune, Maharashtra, India</span>
          </div>
        </div>
     
        <div className="contact2">
          <h6>Get in touch now!</h6>
          <h5>Just Say Hello</h5>
        

          <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
            <label className="contact-label">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your good name?"
                className="contact-input"
              />
            </label>

            <label className="contact-label">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your web address?"
                className="contact-input"
              />
            </label>

            <label className="contact-label">
              <textarea
                rows={7}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What you want to say?"
                className="contact-textarea"
              />
            </label>

            <button type="submit" className="contact-button">
              {loading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};
