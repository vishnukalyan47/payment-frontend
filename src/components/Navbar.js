import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavbarComponent() {
    return (
<Navbar >
          <Navbar.Brand >Navbar</Navbar.Brand>
          <div  className="m-auto  d-flex flex-row justify-content-around gap-3">
          <Link to="/home/customers" style={{textDecoration:"none"}}><h5 >Customers</h5></Link> 
          <Link to="/home/alltns" style={{textDecoration:"none"}}><h5 >All Transactions</h5></Link> 
           <Link to="/home/maketransaction" style={{textDecoration:"none"}}><h5 >Make a Transaction</h5></Link> 
           
          </div>
      </Navbar>
    )
}

export default NavbarComponent;
