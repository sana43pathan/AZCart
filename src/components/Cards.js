import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CardsData from './CardsData'
import { useDispatch } from 'react-redux'
import { ADD } from "../redux/actions/action";
import {NavLink} from 'react-router-dom';



const Cards = () => {
  const [data, setData] = useState(CardsData);

  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const send = (e)=>{
    // console.log(e);
     dispatch(ADD(e));
  }

  return (

    <div className='container mt-3'>
      <h2 className='text-center' id="headingFont" style={{color:"#3d85ec"}}>Clothes that make you look and feel your best</h2>
      <div className='row d-flex justify-content-center align-items-center'>
        {
          data.map((element, id) => {
            return (
              <>
                <Card  className="mx-2 mt-4 card_style">
                <NavLink to={`/cart/${element.id}`}   onClick={handleClose}>
                  <Card.Img variant="top" src={element.imgdata} style={{ height: '22rem' }} className="mt-3 card_image" />
                  </NavLink>   
                  <Card.Body>
                  
                    <Card.Title>
                    <p style={{ color:"#a09797",fontSize:17}}>{element.brandname}</p>
                    <NavLink className="text-decoration-none" to={`/cart/${element.id}`}   onClick={handleClose}>
                      <p style={{ color:"#4b4646",fontSize:17}}>{element.rname}</p>
                    </NavLink>   
                    </Card.Title>
                    <Card.Text>
                     
                     <p>₹{element.price}   <span style={{color:"#a09797",margin:5}}><strike>₹{element.highprice}</strike></span>  <span style={{color:"#3d85ec"}}>{element.offpercent}% off</span></p>
                    
                    </Card.Text>
                    <p><span style={{color:"#716a6a",fontWeight:"500"}}>Size : </span>{
                         element.size.toString().replace(/,/g,", ")
                       }</p>
                  </Card.Body>
                </Card>
              </>
            )

          })

        }

      </div>
    </div>
  )
}

export default Cards;