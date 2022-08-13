import React from 'react'
import { Link } from 'react-router-dom'

function CustomerDetails() {
    return (
        <div>
            <Link to="/home" style={{textDecoration:"none"}}><h4>Back</h4></Link>
            In customer details
        </div>
    )
}

export default CustomerDetails
