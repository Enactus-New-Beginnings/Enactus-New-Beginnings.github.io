import React from 'react';

import GalleryComponent from '../components/GalleryComponent';
import { Container, Row, Col } from 'reactstrap';

import { useLoaderData } from 'react-router-dom'

export default function VideoGallery(){
    const videos = useLoaderData();
    return(
        <Container>
            <Row>
                {
                    videos.map(videoInfo=>{
                        return (
                        <Col sm="4">
                            <GalleryComponent imgRef={videoInfo.imgRef} title={videoInfo.title} subtitle={videoInfo.subtitle} description={videoInfo.desc} link={videoInfo.link}/>
                        </Col>)
                    })
                }
            </Row>
        </Container>
    )
}