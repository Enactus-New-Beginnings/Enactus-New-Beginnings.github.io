import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Outlet, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

import '../styles/Resources.css'

export default function ResourcesSideBar(){
    return(
        <div className='resource-header'>
            <Container fluid>
                <Row>
                    <Col md="2" xs="3" className="sidebar">
                        <Link to="/resources/food" className='selection'>
                            <h5>
                                <FontAwesomeIcon icon={solid('utensils')} style={{paddingRight: '2%'}}/> 
                                Food
                            </h5>
                        </Link>
                        <Link to="/resources/clothing" className='selection'>
                            <h5>
                                <FontAwesomeIcon icon={solid('shirt')} style={{paddingRight: '2%'}}/> 
                                Clothing
                            </h5>
                        </Link>
                        <Link to="/resources/housing" className='selection'>
                            <h5>
                                <FontAwesomeIcon icon={solid('person-shelter')} style={{paddingRight: '2%'}}/> 
                                Shelter
                            </h5>
                        </Link>
                        <hr/>
                        <Link to="/resources/videos/career" className='selection'>
                            <h5>
                                <FontAwesomeIcon icon={solid('briefcase')} style={{paddingRight: '2%'}}/> 
                                Career Help
                            </h5>
                        </Link>
                        <Link to="/resources/videos/finance" className='selection'>
                            <h5>
                                <FontAwesomeIcon icon={solid('money-bill')} style={{paddingRight: '2%'}}/> 
                                Financial Literacy
                            </h5>
                        </Link>
                    </Col>
                    <Col md="10" xs="9" style={{paddingTop: '2%', height: '95%', overflow: 'hidden'}}>
                        <Outlet/>
                    </Col>
                </Row>
            </Container>
        </div>
      )
}