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
                                <FontAwesomeIcon icon={solid('utensils')} /> <br/>
                                Food
                            </h5>
                        </Link>
                        <Link to="/resources/clothing" className='selection'>
                            <h5>
                                <FontAwesomeIcon icon={solid('shirt')} /> <br/>
                                Clothing
                            </h5>
                        </Link>
                        <Link to="/resources/housing" className='selection'>
                            <h5>
                                <FontAwesomeIcon icon={solid('person-shelter')} /> <br/>
                                Shelter
                            </h5>
                        </Link>
                        <hr/>
                        <Link to="/resources/videos/career" className='selection'>
                            <h5>
                                <FontAwesomeIcon icon={solid('briefcase')} /> <br/>
                                Career Help
                            </h5>
                        </Link>
                        <Link to="/resources/videos/finance" className='selection'>
                            <h5>
                                <FontAwesomeIcon icon={solid('money-bill')} /> <br/>
                                Financial Literacy
                            </h5>
                        </Link>
                    </Col>
                    <Col md="10" xs="9">
                        <Outlet/>
                        <h1>test</h1>
                    </Col>
                </Row>
            </Container>
        </div>
      )
}