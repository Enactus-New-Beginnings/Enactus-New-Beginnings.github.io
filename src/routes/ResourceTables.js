import React from 'react';
import { Table } from 'reactstrap';
import { useLoaderData, useLocation } from 'react-router-dom'
import '../styles/Resources.css'

/**
 * Renders resource tables for food, clothing and shelter.
 * @module ResourceTables
 */
export default function ResourceTables(){
    const data = useLoaderData();
    const resourceName = capitalizeFirstLetter(useLocation().pathname.split("/").pop())
    React.useEffect(()=>{
        console.log(data)
    }, [data])
    return (
        <div>
            <h3>{resourceName}</h3>
            <p>You may need to scroll/swipe right to view all information for a resource.</p>
            <div className='table'>
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
 * Capitalize the first letter of a string
 * @param {string} s String to capitalize
 * @returns The string with its first letter capitlalized
 */
function capitalizeFirstLetter(s){
    return s[0].toUpperCase()+s.substring(1)
}

/**
 * Generates table headers/column names based on keys of a data object inthat table
 * @param {Object} headers Some data object in the table
 * @return Table heading tags (th)
 */
function mapHeaderToColumns(headers){
    return Object.keys(headers).map(header=>{
        return (<th>{capitalizeFirstLetter(header)}</th>)
    })
}

/**
 * Maps data from an array of objects to rows in a table. Includes special handling for website links (generates hyperlink) and physical addresses (generates Google Maps link)
 * @param {Array} data An array of data objects, each element represents a row in the table
 * @return Table rows (tr) which contain table data (td) tags
 */
function mapDataToRows(data){
    return data.map(resource=>{
        return (<tr>
            {
                Object.entries(resource).map(vals=>{
                    let key=vals[0]
                    let value=vals[1]
                    if(key.toLowerCase().includes('site')){
                        if(value!=="N/A")
                            return (<td><a target="_blank" rel="noopener noreferrer" href={value} >Link</a></td>)
                    }
                     if(key.toLowerCase().includes('address')){
                         if(value!=="N/A")
                             return (<td><a target="_blank" rel="noopener noreferrer" href={"https://www.google.com/maps/dir/" + value}> {value} </a></td>)
                    }
                    return (<td>{value}</td>)
                    }
                )
            }

        </tr>)
    })
}