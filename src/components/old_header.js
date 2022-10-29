import React, {useEffect, useState} from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Badge from '@mui/material/Badge';
import Nav from 'react-bootstrap/Nav';
import {NavLink} from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/esm/Table';
import { DLT,ADD,REMOVE } from '../redux/actions/action';


const Header = () => {

  const [price,setPrice] = useState(0);
    // console.log(price);

  const getdata = useSelector((state)=> state.cartreducer.carts);
  // console.log(getdata);

  const dispatch=useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const total=()=>{
    let price=0;
    getdata.map((ele,k)=>{
      price=ele.price*ele.qnty+price
    });
    setPrice(price);
  }

  useEffect(()=>{
    total();
},[total])

const send = (e)=>{
  //console.log(e);
  dispatch(ADD(e));
}  

  const dlt = (id)=>{
    dispatch(DLT(id))
}

 // remove one
 const remove = (item)=>{
  dispatch(REMOVE(item))
}

  return (
    <>
    <Navbar className='color_nav d-flex justify-content-center align-items-center' variant="light" style={{height:"60px"}}>
        <Container>
          <NavLink to="/"  className="newFont text-decoration-none text-light mx-3">AZCart</NavLink>
          <Nav className="me-auto mx-5">
            <NavLink to="/" className="text-decoration-none text-light" style={{fontSize:20}}>Home</NavLink>
          </Nav>
          <Badge badgeContent={getdata.length} color="success"
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          >
          <i className="fa fa-shopping-cart text-light s_cart" aria-hidden="true"></i>
          </Badge>
          <span className="mx-3" style={{color:"#fff",fontSize:20}}>Cart</span>
        </Container>
        
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >

      {
                        getdata.length ? 
                        <div className='card_details' style={{width:"24rem",padding:10}}>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Photo</th>
                                        <th>Item Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        getdata.map((e)=>{
                                            return (
                                                <>
                                                    <tr>
                                                        <td>
                                                        <img src={e.imgdata} style={{width:"5rem",height:"5rem"}} alt="" />
                                                        </td>
                                                        <td>
                                                            <p>{e.rname}</p>
                                                            <p>Price : ₹{e.price}</p>
                                                            <p>Quantity : {e.qnty}</p>
                                                            <div className='d-flex justify-content-between align-items-center' style={{width:100,cursor:"pointer",background:"#ddd",color:"#111"}}>
                                                            <span style={{fontSize:24}} onClick={e.qnty <=1 ? ()=>dlt(e.id) : ()=>remove(e)}>-</span>
                                                            <span style={{fontSize:22}}>{e.qnty}</span>
                                                            <span style={{fontSize:24}} onClick={()=>send(e)}>+</span>
                                                            </div>

                                                            <p style={{color:"red",fontSize:20,cursor:"pointer"}} onClick={()=>dlt(e.id)}>
                                                                <i className='fas fa-trash smalltrash'></i>
                                                            </p>
                                                        </td>

                                                        <td className='mt-5'style={{color:"red",fontSize:20,cursor:"pointer"}}  onClick={()=>dlt(e.id)}>
                                                        <i className='fas fa-trash largetrash'></i>
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }
                                    <p className='text-center'>Total :₹{price}</p>
                                </tbody>
                            </Table>
                        </div>:
      
      <div className='card_details d-flex justify-content-center align-items-center'>
      <i className="fa fa-close smallclose close_style" onClick={handleClose}></i>
      <p style={{fontSize:22}}>Your cart is empty</p>
      <img src="./cart.gif" alt="cart" className='emptycart_img' style={{width:"5rem",padding:10}}/>
      </div>
      
      }
      </Menu>
      </Navbar>
    </>
  )
}

export default Header;