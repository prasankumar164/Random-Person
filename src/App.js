import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
  FaMapPin,
  FaBlackberry,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage = "https://randomuser.me/api/portraits/men/75.jpg";

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("random person");

  console.log(user);

  const getperson = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      const user = data.results[0];
      const { phone, email } = user;
      const { large: image } = user.picture;
      const {
        login: { password },
      } = user;
      const { first, last } = user.name;
      const {
        dob: { age },
      } = user;
      const {
        street: { number, name },
      } = user.location;

      const newUser = {
        image,
        phone,
        email,
        password,
        age,
        street: `${number} ${name}`,
        name: `${first} ${last}`
      };
      setUser(newUser)
      setLoading(false)
      setTitle('name')
      setValue(newUser.name)
    } 
    catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getperson();
  }, []);

  const handleValue = (e) => {
    if(e.target.classList.contains('icon')){
      const newValue = e.target.dataset.label;
      setTitle(newValue)
      setValue(user[newValue])
    }
  };
  // (person && person.image) ||
  return (
    <main>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={(user && user.image) || defaultImage}
            alt="random user"
            className="user-img"
          />
          <p className="ser-title">my {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button className="icon" data-label="age" onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-label="street"
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
          </div>
          <button className="btn" type="button" onClick={getperson}>
            {loading ? "loading..." : "random user"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
