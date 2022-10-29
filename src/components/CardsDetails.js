import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { useNavigate, useParams } from 'react-router-dom';
import {useDispatch, useSelector } from 'react-redux';
import { ADD, DLT, REMOVE } from "../redux/actions/action";
import Button from 'react-bootstrap/Button'
import CardsData from './CardsData'

const CardsDetails = () => {
    const [data, setData] = useState([]);
    //console.log(data);

    const {id} = useParams();

    const history = useNavigate();

  //  const getdata = useSelector((state)=> state.cartreducer.carts);
  //   console.log(CardsData);

    const compare = ()=>{
        let comparedata = CardsData.filter((e)=>{
          return e.id == id
        });
        console.log(comparedata);
 
       setData(comparedata);
      }

      

     const dispatch = useDispatch();

      const send = (e)=>{
        //console.log(e);
        dispatch(ADD(e));
      }  

      const dlt = (id)=>{
        dispatch(DLT(id));
        history("/");
    }
    
    // remove one
    const remove = (item)=>{
      dispatch(REMOVE(item))
    }

      useEffect(()=>{
        compare();
      },[id])
    

    return (
            <div className="container">
           
           <div className="bg_image">
                <h3 className='text-center' style={{fontSize:30,fontWeight:500,color:"#fff"}}>Item Details Page</h3>

                <section className='mt-3'>
                <div className="itemsdetails">
          {
            data.map((ele)=>{
              
              return (
                <>
                <div className="items_img">
              <img className='my-4' src={ele.imgdata} alt="" />
            </div>

            <div className="details" >
            <p className='mx-2' style={{fontSize:18,fontWeight:500}}>{ele.rname}</p>
              <Table className='mb-0'>
                <tr>
                  <td>
                  <p>₹{ele.price}   <span style={{margin:5}}><strike>₹{ele.highprice}</strike></span>  <span>{ele.offpercent}% off</span></p>
                  <p><strong>Seller :</strong> <span >{ele.seller}	</span></p>
                    <p> <strong>Brandname</strong>  : {ele.brandname}</p>
                    <p><Table>
                        <tr><strong>Size</strong> : {ele.size.map((e)=>{
                      return(
                        <td>
                    <span className="box">{e}</span>
                    </td>
                      )
                    }
                    )
                    }</tr></Table></p>
                     <p className='smallrating'><strong>Rating :</strong> <span style={{background:"green",color:"#fff",padding:"2px 5px",borderRadius:"5px"}}> {ele.rating}★	</span></p>
                    <p className='smalltrash'><strong>Remove :</strong> <span ><i className='fas fa-trash' onClick={()=>dlt(ele.id)} style={{color:"red",fontSize:20,cursor:"pointer"}}></i>	</span></p>
                    <p></p>
                  </td>
                  <td>
                    <p className='largerating'><strong>Rating :</strong> <span style={{background:"green",color:"#fff",padding:"2px 5px",borderRadius:"5px"}}> {ele.rating}★	</span></p>
                    <p className='largetrash'><strong>Remove :</strong> <span ><i className='fas fa-trash' onClick={()=>dlt(ele.id)} style={{color:"red",fontSize:20,cursor:"pointer"}}></i>	</span></p>
                    <p></p>
                    <p></p>
                  </td>
                </tr>
              </Table>
              <div className='d-flex justify-content-center'>
                      <Button onClick ={()=>send(ele)} style={{backgroundColor:"#c0d1ea",color:"#000"}} className='col-lg-4'>
                      <i className="fa fa-shopping-cart" style={{fontSize:20}} aria-hidden="true"></i><span>Add to Cart</span></Button>
              </div>
              
            </div>
            
          
                </>
              )
            })
          }


          </div>

                </section>
               

            </div>
            </div>


    )
}

export default CardsDetails