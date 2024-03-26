import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function CreatedBy() {
  const [loginApi, setLoginApi] = useState([]);
  const [reviewApi, setreviewApi] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("http://localhost:8000/Fav");
        setLoginApi(response.data);
        console.log("login data",response.data)
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("http://localhost:8000/Fav");
        const data = response.data
        const filteredData = data.filter(item => item.username === selected);
        console.log("review data",data)
        setreviewApi(filteredData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchdata();
  }, [selected]);

  const handleSelect = (e)=>{
    setSelected(prevSelected => e.target.value);
  }

  return (
    <div>
      <select  name="users" id="users" onChange={handleSelect}>
        {loginApi.map((item) => (
          <option key={item._id} value={item.username}>
            {item.username}
          </option>
        ))}
      </select>
      <div>{reviewApi && reviewApi.map((item)=>{
       return(
        <div key={item._id}>
            <h3>Artist:{item.Artist}</h3>
            <h3>Song:{item.Song}</h3>
            <h3>Album:{item.Album}</h3> <hr />
        </div>
       )
      })}</div>
    </div>
  );
}

export default CreatedBy;