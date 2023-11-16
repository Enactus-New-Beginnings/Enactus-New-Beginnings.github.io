import React from 'react';
import { Table } from 'reactstrap';
import { useLoaderData } from 'react-router-dom'
import '../styles/Resources.css'
import { useEffect } from 'react';

/**
 * Shows list of employers in the area, and attempts to match you with best fit according to resume.
 * @module Employment
 */


export default function Employment(){
    const data = useLoaderData();
    useEffect(()=>{console.log(data)},[data]);
    
    return (
        <div>
            <div className='employment-header'>
                <h3>Employment</h3>
                <p>You may need to scroll/swipe right to view all information for a resource.</p>
                <Table striped bordered responsive>
                        <thead>
                        <tr>
                            {
                                mapHeaderToColumns(data[0])
                            }
                        </tr>
                        </thead>
                        <tbody>
                            {
                                mapDataToRows(data)
                            }
                        </tbody>
                    </Table>
            </div>
        </div>
            
    );
}

/**
 * Generates table headers/column names based on keys of a data object inthat table
 * @param {Object} headers Some data object in the table
 * @return Table heading tags (th)
 */
function mapHeaderToColumns(headers){
    let headersArray = Object.keys(headers).sort(orderResourceElements)
    return headersArray.map(header=>{
        return (<th key={header}>{capitalizeFirstLetter(header)}</th>)
    })
}

/**
 * Maps data from an array of objects to rows in a table. Includes special handling for website links (generates hyperlink) and physical addresses (generates Google Maps link)
 * @param {Array} data An array of data objects, each element represents a row in the table
 * @return Table rows (tr) which contain table data (td) tags
 */
function mapDataToRows(data){
    return data.map(resource=>{
        return (<tr key={Math.random()*1000}>
            {
                Object.keys(resource).sort(orderResourceElements).map((key)=>{
                    let value=resource[key]
                    if(key.toLowerCase().includes('site')){
                        if(value!=="N/A")
                            return (<td key={resource[key]}><a headertarget="_blank" rel="noopener noreferrer" href={value} >Link</a></td>)
                    }
                    if(key.toLowerCase().includes('link')){
                        if(value!=="N/A")
                            return (<td key={resource[key]}><a target="_blank" rel="noopener noreferrer" href={value} >Link</a></td>)
                    }
                     if(key.toLowerCase().includes('address')){
                         if(value!=="N/A")
                             return (<td key={resource[key]}><a target="_blank" rel="noopener noreferrer" href={"https://www.google.com/maps/dir//" + value}> {value} </a></td>)
                    }
                    return (<td key={resource[key]}>{value}</td>)
                    }
                )
            }

        </tr>)
    })
}

/**
 * Capitalize the first letter of a string
 * @param {String} s String to capitalize
 * @returns The string with its first letter capitalized
 */
function capitalizeFirstLetter(s){
    return s[0].toUpperCase()+s.substring(1)
}

/**
 * Orders the columns of the tables correctly (name first, type second, address third, etc)
 * @param {String} a 
 * @param {String} b 
 * @returns integer used for compare function (negative if a<b, zero if a=b, positive if a>b)
 */
function orderResourceElements(a, b){
    let valuesLookup={
        name: 1,
        type: 2,
        address: 3,
        county: 4,
        phone: 5,
        site: 6, website: 6,
        notes: 1000,
        other: 1001
    }
    let aVal = valuesLookup[a]?valuesLookup[a]:a.charCodeAt(0)
    let bVal = valuesLookup[b]?valuesLookup[b]:b.charCodeAt(0)
    return aVal-bVal
}