import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/img/logo.png';
import { BsLinkedin } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";
import { useState ,useEffect } from 'react';
export const NavBar = ()=>{   
    const [activateLink , setActivateLink] = useState('home');   
    const [scrolled , setScrolled]=useState(false);
    useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) { // ✅ use scrollY, not window.scroll
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, []);

const onUpdateActivateLink=(value)=>{
    setActivateLink(value);

}

  return (
    <Navbar expand="lg" className={scrolled ? "scroll" :""}>
      <Container>
        <Navbar.Brand href="#" className='logo-img'><img src={logo} alt = "logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav"><span className='navbar-toggler-icon'></span></Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#about" className={activateLink === "about" ?'active navbar-link' : 'navbar-link'} onClick={()=>onUpdateActivateLink('about')}>About</Nav.Link>
            <Nav.Link href="#education" className={activateLink === "education" ?'active navbar-link' : 'navbar-link'} onClick={()=>onUpdateActivateLink('education')}>Education</Nav.Link>
            {/* <Nav.Link href="#experience" className={activateLink === "experience" ?'active navbar-link' : 'navbar-link'} onClick={()=>onUpdateActivateLink('experience')}>Experience</Nav.Link> */}
            <Nav.Link href="#skillset" className={activateLink === "skillset" ?'active navbar-link' : 'navbar-link'} onClick={()=>onUpdateActivateLink('skillset')}>Skillset</Nav.Link>
            <Nav.Link href="#project" className={activateLink === "projects" ?'active navbar-link' : 'navbar-link'} onClick={()=>onUpdateActivateLink('projects')}>Projects</Nav.Link>
             {/* <Nav.Link href="#testimonials"  className={activateLink === "testimonials" ?'active navbar-link' : 'navbar-link'} onClick={()=>console.log('open resume')}>Testimonials</Nav.Link> */}
            <Nav.Link href="#contact" className={activateLink === "contact" ?'active navbar-link' : 'navbar-link'} onClick={()=>onUpdateActivateLink('contact')}>Contact</Nav.Link>
           
          </Nav>
          <span className="navbar-text">
            <div className="social-icon">
              <span>
                <a href="https://www.linkedin.com/in/ayushi-jain-7349a9228/" target="_blank" rel="noopener noreferrer">
                  <BsLinkedin />
                </a>
              </span>

              <span>
                <a href="https://github.com/ayushijain185" target="_blank" rel="noopener noreferrer">
                  <FaGithub />
                </a>
              </span>

              <span>
                <a href="https://leetcode.com/u/ayushi_jain1/" target="_blank" rel="noopener noreferrer">
                  <SiLeetcode />
                </a>
              </span>
            </div>

            <button className="vvd">
              <a href="https://drive.google.com/file/d/1Hj16vxF-8YmfdKqYiDjcwyG6wfLk2xJX/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                Resume
              </a>
            </button>
          </span>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}