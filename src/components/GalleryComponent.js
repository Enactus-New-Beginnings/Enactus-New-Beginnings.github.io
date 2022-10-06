import React from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';

export default function GalleryComponent(props){
    return (<Card
        style={{
          width: 'auto'
        }}
      >
        <img
          alt="Sample"
          src={props.imgRef}
        />
        <CardBody>
          <CardTitle tag="h5">
            {props.title}
          </CardTitle>
          <CardSubtitle
            className="mb-2 text-muted"
            tag="h6"
          >
            {props.subtitle}
          </CardSubtitle>
          <CardText>
            {props.description}
          </CardText>
          <Button color="info" href={props.link} target="_blank" rel="noopener noreferrer">
            Watch Video
          </Button>
        </CardBody>
      </Card>)
}