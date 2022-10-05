import logo from '../img/logo.png';
import '../styles/Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Button, Container, Row, Col } from 'reactstrap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="title">New <br/>Beginnings</h1>
        <div className='box'>
            <p style={{color: 'black'}}>Our mission is to help formerly incarcerated individuals secure employment, establish strong relationships with mentors, and gain access to local resources in order to ease their transition from prison.</p>
        </div>
      </header>
      <body>
    <div className='features'>
        <Container>
            <Row>
                <Col sm="4">
                    <FontAwesomeIcon icon={solid('briefcase')} />
                    <h3>Employment</h3>
                    <p>Reach out to employers who don’t discriminate based on past convictions. Create an account and upload your resume to get matched with oppurtunities most relevant to you!</p>
                    <Button color="primary" size="lg" style={{margin:'2%'}}>Upload Your Resume</Button>
                    <br/>
                    <Button color="primary" size="lg" style={{margin:'2%'}}>View Employers</Button>
                </Col>
                <Col sm="4">
                  <FontAwesomeIcon icon={solid('book')} />
                  <h3>Resources</h3>
                  <p>Here you can find a curriculum to guide your professional development, as well as other local resources: affordable housing, local support groups, transportation etc. </p>
                  <Button color="success" size="lg" style={{margin:'2%'}}>Local Resources</Button>
                  <br/>
                  <Button color="success" size="lg" style={{margin:'2%'}}>Video Tutorials</Button>
                </Col>
                <Col sm="4">
                  <FontAwesomeIcon icon={solid('handshake')} />
                  <h3>Mentorship</h3>
                  <p>Connect with like-minded people who turned their lives around upon re-entering society. Studies show that people with strong mentors are twice as likely to get employed. </p>
                  <Button color="warning" size="lg" style={{margin:'2%'}} disabled>Coming Soon!</Button>
                </Col>
            </Row>
        </Container>
    </div>     
      </body>
    </div>
  );
}

export default App;
