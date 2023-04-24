// Importing modules
import React, { useState, useEffect, Component } from "react";
import Axios from "axios";

function Prediction() {
  //Using useState to set incoming variable from Python backend
  const [data, setdata] = useState([{}]);
  const [name, setName] = useState("");

  function sendUserInfo() {
    let name = document.getElementById("name").value;
    let gender = document.getElementById("gender").value;
    let age = document.getElementById("age").value;
    let hypertension = document.getElementById("hypertension").value;
    let heart = document.getElementById("heart").value;
    let marital = document.getElementById("marital").value;
    let work = document.getElementById("work").value;
    let residence = document.getElementById("residence").value;
    let glucose = document.getElementById("glucose").value;
    let bmi = document.getElementById("bmi").value;
    let smoking = document.getElementById("smoking").value;

    //SETTING NAME TO CURRENT NAME FOR MONGODB
    setName(name);

    //FORM VALIDATION
    if (
      name.trim().length == 0 ||
      gender.trim().length == 0 ||
      age.trim().length == 0 ||
      hypertension.trim().length == 0 ||
      heart.trim().length == 0 ||
      marital.trim().length == 0 ||
      work.trim().length == 0 ||
      residence.trim().length == 0 ||
      glucose.trim().length == 0 ||
      bmi.trim().length == 0 ||
      smoking.trim().length == 0
    ) {
      alert("Please enter all fields!");
      return;
    }

    let userInfo = [];
    userInfo.push(
      name,
      gender,
      age,
      hypertension,
      heart,
      marital,
      work,
      residence,
      glucose,
      bmi,
      smoking
    );
    console.log(userInfo);

    //Initializing a request that can POST to the python backend
    const request = new XMLHttpRequest();
    request.open("POST", `/ProcessUserinfo/${JSON.stringify(userInfo)}`);
    request.send();

    //fetching using fetch function; i.e. GET request
    fetch(`/ProcessUserinfo/${JSON.stringify(userInfo)}`).then((res) =>
      res.json().then((data) => {
        setdata(data);
        var stringified = JSON.stringify(data);
        var parsedObj = JSON.parse(stringified);
        console.log(parsedObj);

        //BACKEND MONGODB TO STORE STROKE CHANCES WITH USERNAME
        Axios.post("http://localhost:3001/insert", {
          userName: name,
          strokeStatus: parsedObj,
        });

        if (parsedObj == "No stroke")
          alert("Congratulations! Your chances of a stroke are low.");
        else
          alert(
            "Your chances of getting a stroke are high, please consult a doctor!"
          );
      })
    );
  }

  return (
    <div className="App">
      <div className="form-box">
        <form>
          <div className="form-container">
            <h1>ENTER &nbsp; DETAILS</h1>
            <h1>TO &nbsp; FIND &nbsp; CHANCES &nbsp; OF &nbsp; STROKE</h1>
            <br></br>
            <h3>NAME:</h3>
            <input
              type="text"
              name="Name"
              id="name"
              placeholder="Name"
              required
            ></input>
            <br></br>
            <h3>GENDER:</h3>
            <input
              type="text"
              id="gender"
              placeholder="Gender"
              list="genders"
              required
            />
            <datalist id="genders">
              <option>Male</option>
              <option>Female</option>
            </datalist>
            <br></br>
            <h3>AGE:</h3>
            <input
              type="number"
              name="Age"
              id="age"
              placeholder="Age"
              required
            ></input>
            <br></br>
            <h3>HYPERTENSION:</h3>
            <input
              type="text"
              id="hypertension"
              placeholder="Hypertension (1 if true 0 if false)"
              list="hyper"
              required
            ></input>
            <br></br>
            <datalist id="hyper">
              <option>0</option>
              <option>1</option>
            </datalist>
            <br></br>
            <h3>HEART DISEASE:</h3>
            <input
              type="text"
              id="heart"
              placeholder="Heart disease (1 if true 0 if false)"
              list="heartlist"
              required
            ></input>
            <br></br>
            <datalist id="heartlist">
              <option>0</option>
              <option>1</option>
            </datalist>
            <br></br>
            <h3>MARITAL STATUS:</h3>
            <input
              type="text"
              id="marital"
              placeholder="Marital Status"
              list="maritallist"
              required
            ></input>
            <br></br>
            <datalist id="maritallist">
              <option>Yes</option>
              <option>No</option>
            </datalist>
            <br></br>
            <h3>WORK STATUS:</h3>
            <input
              type="text"
              id="work"
              placeholder="Work status"
              list="worklist"
              required
            ></input>
            <br></br>
            <datalist id="worklist">
              <option>Private</option>
              <option>Self-employed</option>
              <option>Govt-job</option>
              <option>Children</option>
              <option>Never worked</option>
            </datalist>
            <br></br>
            <h3>RESIDENCE TYPE:</h3>
            <input
              type="text"
              id="residence"
              placeholder="Residence type"
              list="residencelist"
              required
            ></input>
            <br></br>
            <datalist id="residencelist">
              <option>Urban</option>
              <option>Rural</option>
            </datalist>
            <br></br>
            <h3>GLUCOSE LEVEL:</h3>
            <input
              type="number"
              name="Glucose"
              id="glucose"
              placeholder="Glucose Level"
              required
            ></input>
            <br></br>
            <h3>BMI:</h3>
            <input
              type="number"
              name="BMI"
              id="bmi"
              placeholder="BMI"
              required
            ></input>
            <br></br>
            <h3>SMOKING STATUS:</h3>
            <input
              type="text"
              id="smoking"
              placeholder="Smoking Status"
              list="smokinglist"
              required
            ></input>
            <br></br>
            <datalist id="smokinglist">
              <option>smokes</option>
              <option>never smoked</option>
              <option>formerly smoked</option>
              <option>Unknown</option>
            </datalist>
            <br></br>

            <button type="button" className="submit" onClick={sendUserInfo}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Prediction;
