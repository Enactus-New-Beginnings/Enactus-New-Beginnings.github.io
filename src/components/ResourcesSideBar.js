import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Outlet } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'

import '../styles/Resources.css'

export default function ResourcesSideBar(){
    return(
        <div className='resource-header'>
            <Container fluid>
                <Row>
                    <Col md="2" xs="3" className="sidebar">
                        <div className='selection'>
                            <h5>
                                <FontAwesomeIcon icon={solid('utensils')} /> <br/>
                                Food
                            </h5>
                        </div>
                        <div className='selection'>
                            <h5>
                                <FontAwesomeIcon icon={solid('shirt')} /> <br/>
                                Clothing
                            </h5>
                        </div>
                        <div className='selection'>
                            <h5>
                                <FontAwesomeIcon icon={solid('person-shelter')} /> <br/>
                                Shelter
                            </h5>
                        </div>
                        <hr/>
                        <div className='selection'>
                            <h5>
                                <FontAwesomeIcon icon={solid('briefcase')} /> <br/>
                                Career Help
                            </h5>
                        </div>
                        <div className='selection'>
                            <h5>
                                <FontAwesomeIcon icon={solid('money-bill')} /> <br/>
                                Financial Literacy
                            </h5>
                        </div>
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