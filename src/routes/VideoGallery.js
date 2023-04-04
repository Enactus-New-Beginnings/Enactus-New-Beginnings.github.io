import React from 'react';
import ReactGA from "react-ga4";
import GalleryComponent from '../components/GalleryComponent';
import { Container, Row, Col } from 'reactstrap';

import { useLoaderData } from 'react-router-dom'
/**
 * Renders the video resource pages, which are a gallery view of YouTube tutorials
 * @module VideoGallery
 */
export default function VideoGallery(){
    const videos = useLoaderData();
    React.useEffect(()=>{
        ReactGA.send({ hitType: "pageview", page: "videogallery" });
        }, [])  
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
 * @param {VideoMetaData[]} videos List of videos to create tables from, each element also contains video metadata
 * @see VideoMetaData
 */
function createGalleryFromVideos(videos){
    return videos.map(videoInfo=>{
        return (
        <Col sm="4">
            <GalleryComponent imgRef={videoInfo.imgRef} title={videoInfo.title} subtitle={videoInfo.subtitle} description={videoInfo.desc} link={videoInfo.link}/>
        </Col>)
    })
}