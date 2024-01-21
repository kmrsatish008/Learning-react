import React, { useEffect } from 'react';
// import  ReactDOM from 'react-dom/client';
import { useState } from 'react';
import Simmer from './Simmer';
// import resList from '../utils/mockData';

// let resList = [
//     {
//     data:{
//         id:'1',
//         name: 'KFC',
//         logo:"sz0xmpjm2yug2jakcpcw",
//         cuisines:['Burger','Snacks','Fast Food','fndsfn','sdbsfb'],
//         costForTwo: 40000,
//         deliveryTime : 36,
//         avgRating: "3.8",
//     }},
//     {
//     data:{
//             id:'2',
//             name: 'Dominos',
//             logo:"b033728dcb0101ceb19bff0e1e1f6474",
//             cuisines:['Burger','Snacks','Fast Food'],
//             costForTwo: 30000,
//             deliveryTime : 50,
//             avgRating: "4.5",
//         }},
//         {
//             data:{
//                 id:'3',
//                 name: 'Mona',
//                 logo:"ecd32b841549ce6bfd993260a2086c1f",
//                 cuisines:['Burger','Snacks','Fast Food'],
//                 costForTwo: 50000,
//                 deliveryTime : 45,
//                 avgRating: "4.8",
//             }},
//             {
//                 data:{
//                     id:'4',
//                     name: 'Burger King',
//                     logo:"e33e1d3ba7d6b2bb0d45e1001b731fcf",
//                     cuisines:['Burger','Fast Food'],
//                     costForTwo: 35000,
//                     deliveryTime : 30,
//                     avgRating: "4.0",
//                 }},
// ]

const Body = () => {
    const [listOfRest, setListOfRest] = useState([]);
    const [newListRes , setNewlistRes] = useState([]);

    const [searchRes , setSearchRes ] = useState("");

    useEffect(() =>{
        // fectData();
        fectData1();
    },[])

    const fectData1 = async () =>{
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.57135395946858&lng=77.3356980711697&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")

        const json = await data.json();
        // console.log(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants.info);
        setListOfRest(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        setNewlistRes(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        
    }

    // const fectData = () =>{
    //      fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.57135395946858&lng=77.3356980711697&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
    //     .then((response) =>{
    //         // console.log(response.json());
    //         response.json().then((data)=>{
    //             console.log(data);
    //         })
    //     }).catch((error) =>{
    //         console.log(error);
    //     }).finally(() =>{
    //         console.log("finally called")
    //     })
    // }

    if(listOfRest.length === 0){
        return <Simmer />
    }

    return (
      <div className='res-cointainer'>
      <div className='search'>
        <input type='text' placeholder='Search resturant' value={searchRes} onChange={(e) =>{
            setSearchRes(e.target.value);
        }}/>
        <button className='btn-search' onClick={() =>{
            const res = listOfRest.filter((res) => {
                return res.info.name.toLocaleLowerCase().includes(searchRes.toLocaleLowerCase());
                
            })
            setNewlistRes(res);
            setSearchRes("");
        }}>Search</button>
      
      <button className='res-btn' onClick={() =>{
        const filteredList = listOfRest.filter((res) =>{
            return res.info.avgRating > 4.2;
        })
        setNewlistRes(filteredList);
      }}>Top reated Resturant</button>
      </div>
      <div className='res-card'>
      {
        newListRes.map((r) => (
            <Resturant key = {r.info.id} resData = {r} />
        ))
      }
      </div>
      </div>
    );
  }
  
  const Resturant = (props) => {

    const {resData} = props;
    const {
        name,
        cloudinaryImageId,
        cuisines,
        costForTwo,
        deliveryTime,
        avgRating
                } = resData?.info;

    const URL = `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`;            
    return(
      <div className='items'>
        <img className='res-logo' alt='res-name' src={URL}></img>
        <h4>{name}</h4>
        <h4>{cuisines.join(',')}</h4>
        <h4><span>{avgRating} stars</span></h4>
        <h4><span>{deliveryTime} Mins</span></h4>
        <h4>{costForTwo} FOR TWO</h4>
        </div>
    )
  }

  export default Body;