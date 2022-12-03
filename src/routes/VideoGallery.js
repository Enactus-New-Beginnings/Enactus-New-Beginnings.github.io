import React from 'react';

import GalleryComponent from '../components/GalleryComponent';
import { Container, Row, Col } from 'reactstrap';

import { useLoaderData } from 'react-router-dom'
/**
 * Renders the video resource pages, which are a gallery view of YouTube tutorials
 * @module VideoGallery
 */
export default function VideoGallery(){
    const videos = useLoaderData();
    return(
        <Container>
            <Row>
                {
                    createGalleryFromVideos(videos)
                }
            </Row>
        </Container>
    )
}

/**
 * Create a gallery of videos from an array containing additional metadata such as description and link
 * @param {Array} videos List of videos to create tables from, each element also contains video metadata
 * @see VideoData
 */
function createGalleryFromVideos(videos){
    return videos.map(videoInfo=>{
        return (
        <Col sm="4">
            <GalleryComponent imgRef={videoInfo.imgRef} title={videoInfo.title} subtitle={videoInfo.subtitle} description={videoInfo.desc} link={videoInfo.link}/>
        </Col>)
    })
}