import React from 'react';
import { Table } from 'reactstrap';
import { useLoaderData, useLocation } from 'react-router-dom'
import '../styles/Resources.css'

/**
 * Shows list of employers in the area, and attempts to match you with best fit according to resume.
 * @module Employment
 */
export default function Employment(){
    const dummyData=[{
        name: "Bob",
        age: 100,
        notes: "Test data 1"
    },{
        name: "Joe",
        age: 200,
        notes: "Test data 2"
    },{
        name: "Dummy",
        age: 300,
        notes: "Test data 3"
    },]
    return (
        <div className='employment-header'>
            <h1>Employment</h1>
        </div>
    );
}