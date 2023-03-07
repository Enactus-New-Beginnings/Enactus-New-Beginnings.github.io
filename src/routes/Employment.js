import React from 'react';
import { Table } from 'reactstrap';
import { useLoaderData, useLocation } from 'react-router-dom'
import '../styles/Resources.css'
import { useEffect } from 'react';

/**
 * Shows list of employers in the area, and attempts to match you with best fit according to resume.
 * @module Employment
 */


export default function Employment(){
    const data = useLoaderData();
    useEffect(()=>{console.log(data)},[]);
    
    return (
        <div className='employment-header'>
            <h1>Employment</h1>
        </div>
    );
}