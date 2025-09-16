import {Container, Row,Col} from "react-bootstrap"
import { useState , useEffect } from "react";
import { FiArrowRightCircle } from "react-icons/fi";
import headerImg from '../assets/img/headerImg.jpg';
import TrackVisibility from 'react-on-screen';
export const Banner=()=>{
    const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Web Developer", "React Native Developer" , "Backend Developer "];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  return (
    <section className="banner" id="about">
      <Container>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) =>
              <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                <span className="tagline">Welcome to my Portfolio</span>
                <h1>{`Hi! I'm Ayushi`} <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Web Developer", "React Native Developer" , "Backend Developer" ]'><span className="wrap">{text}</span></span></h1>
                  <p>A Skilled and motivated Web Developer with hands-on experience in React.js, Node.js, Express.js,
                    MongoDB, Bootstrap, and TailwindCSS also having Strong problem-solving and teamwork abilities, with a passion for
                    innovation and technology.</p>
                  <button><a href="https://www.linkedin.com/in/ayushi-jain-7349a9228/" target="_blank" rel="noopener noreferrer" >Let’s Connect<FiArrowRightCircle size={25} /> </a></button>
              </div>}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) =>
                <div className={isVisible ? "animate__animated animate__zoomIn" : ""}>
                  <img src={headerImg} alt="Header Img"/>
                </div>}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  )
}