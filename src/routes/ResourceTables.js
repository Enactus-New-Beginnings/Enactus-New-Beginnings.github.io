import React from 'react';
import { Table } from 'reactstrap';
import { useLoaderData, useLocation } from 'react-router-dom'
import '../styles/Resources.css'

const capitalizeFirstLetter=(s)=>{
    return s[0].toUpperCase()+s.substring(1)
}

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
                            Object.keys(data[0]).map(header=>{
                                return (<th>{capitalizeFirstLetter(header)}</th>)
                            })
                        }
                    </tr>
                    </thead>
                    <tbody>
                        {
                            data.map(resource=>{
                                return (<tr>
                                    {
                                        Object.entries(resource).map(vals=>{
                                            let key=vals[0]
                                            let value=vals[1]
                                            if(key.toLowerCase().includes('site')){
                                                if(value!=="N/A")
                                                    return (<td><a target="_blank" rel="noopener noreferrer" href={value} >Link</a></td>)
                                            }
                                            return (<td>{value}</td>)
                                        })
                                    }
                                </tr>)
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
