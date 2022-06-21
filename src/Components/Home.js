import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "../App.css";
import { } from "@mui/material";
import {
  Add,
  Chat,
  FavoriteRounded,
  Notifications,
  Person,
  QuestionMark,
} from "@mui/icons-material";
import MenuContainer from './MenuContainer';
import Pin from './Pin';

import Data from "./Data";
import Search from './Search';

function Home() {
    const [inputValue, setInputValue] = useState('');
    const clientID = '0qlBeg2qtj8g9LUUdbMGPpm8Jj0-ialyOa_gSeFEtCs';
    const [result, setResult] = useState([]);
    const [status,setStatus]=useState(true)
    
    useEffect(() => {
      const allIcon = document.querySelectorAll(".iconContainer");

      function setMenuActive() {
        allIcon.forEach((n) => n.classList.remove("black"));
        this.classList.add("black");
      }

    allIcon.forEach((n) => n.addEventListener("click", setMenuActive));
    }, []);
    
    useEffect(() => {
      const allIcon = document.querySelectorAll(".iconContainer");

      function setMenuActive() {
        allIcon.forEach((n) => n.classList.remove("black"));
        this.classList.add("black");
      }

    allIcon.forEach((n) => n.addEventListener("click", setMenuActive));
  }, []);


  useEffect(() => {
    axios.get(`https://api.unsplash.com/search/photos?page=1&query=${inputValue}&client_id=${clientID}`).then((res) => {
      console.log(res.data.results)
      setResult(res.data.results)
   })
},[inputValue])

  const handleOnChange = (e) => {
    setInputValue(e.target.value)
    // console.log(inputValue)

  }

  return (
      <div className="App">
           <div className="menuContainer">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/codewithvetriapi-c56e3.appspot.com/o/pintrest.png?alt=media&token=e2f8aa13-a83f-4ae7-bcf6-a6d5c1b64df4"
          alt=""
          className="logo"
        />

        <div className="subMenu">
          <div>
            <MenuContainer icon={<Person />} />
            <MenuContainer icon={<Notifications />} />
            <MenuContainer icon={<Chat />} />
          </div>

          <div>
            <MenuContainer icon={<FavoriteRounded />} />
          </div>

          <div>
            <MenuContainer icon={<QuestionMark />} />
            <MenuContainer icon={<Add />} />
          </div>
        </div>
      </div>

      <main>
        <div className="searchBox">

          <input type="text" placeholder="Search" value={inputValue} onChange={(e) => handleOnChange(e)} />

          <div className="search">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/codewithvetriapi-c56e3.appspot.com/o/icons8-forward-arrow-100.png?alt=media&token=3f56e775-43c1-41d3-a0c4-90217b31b5be"
              alt=""
            />
          </div>
              </div>
              
               <div className="mainContainer2">
                  {result &&                   
                      result.map((photo) => (<Search photo={photo.urls.small} key={photo.id} description={photo.alt_description} link={photo.links.html} />
            
                      ))
                  }
                  </div>
                <h1>Trendings</h1>
              <div className="mainContainer">
          {status && Data &&
            Data.map((data) => (
                <Pin
                key={data.id}
                pinSize={data.size}
                imgSrc={data.imgSrc}
                name={data.name}
                link={data.link}
              />
            ))}
              </div>
             
              
              
      </main>
    </div>
  )
}

export default Home