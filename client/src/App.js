import './App.css';
import { Banner } from './components/Banner';
import { Education } from './components/Education';
import { NavBar } from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Skillset } from './components/Skillset';
import { Project } from './components/Project';
// import { Work } from './components/Work';
// import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <Education />
      {/* <Work /> */}
      <Skillset />
      <Project />
      {/* <Testimonials /> */}
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
