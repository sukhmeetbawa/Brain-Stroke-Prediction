// Importing modules
import React, { useState, useEffect, Component } from "react";
import "./App.css";
import Smoke from "./images/smoke.png"
import Bmi from "./images/BMI.png"
import Glucose from "./images/glucose.png"
import Hypertension from "./images/Hypertension.png"
import Age from "./images/age.png"
import Axios from 'axios'


function App() {

  //Using useState to set incoming variable from Python backend
  const [data, setdata] = useState([{}]);
  const [name, setName] = useState("");

  function sendUserInfo() {
    let name = document.getElementById('name').value
    let gender = document.getElementById('gender').value
    let age = document.getElementById('age').value
    let hypertension = document.getElementById('hypertension').value
    let heart = document.getElementById('heart').value
    let marital = document.getElementById('marital').value
    let work = document.getElementById('work').value
    let residence = document.getElementById('residence').value
    let glucose = document.getElementById('glucose').value
    let bmi = document.getElementById('bmi').value
    let smoking = document.getElementById('smoking').value

    //SETTING NAME TO CURRENT NAME FOR MONGODB
    setName(name);



    //FORM VALIDATION
    if (name.trim().length == 0 || gender.trim().length == 0 || age.trim().length == 0 || hypertension.trim().length == 0 || heart.trim().length == 0 || marital.trim().length == 0 || work.trim().length == 0 || residence.trim().length == 0 || glucose.trim().length == 0 || bmi.trim().length == 0 || smoking.trim().length == 0) {
      alert("Please enter all fields!");
      return;
    }

    let userInfo = []
    userInfo.push(name, gender, age, hypertension, heart, marital, work, residence, glucose, bmi, smoking);
    console.log(userInfo);



    //Initializing a request that can POST to the python backend
    const request = new XMLHttpRequest()
    request.open('POST', `/ProcessUserinfo/${JSON.stringify(userInfo)}`)
    request.send();

    //fetching using fetch function; i.e. GET request
    fetch(`/ProcessUserinfo/${JSON.stringify(userInfo)}`).then((res) =>
      res.json().then((data) => {
        setdata(data)
        var stringified = JSON.stringify(data);
        var parsedObj = JSON.parse(stringified);
        console.log(parsedObj)


        //BACKEND MONGODB TO STORE STROKE CHANCES WITH USERNAME
        Axios.post("http://localhost:3001/insert", { userName: name, strokeStatus: parsedObj });


        if (parsedObj == "No stroke")
          alert("Congratulations! Your chances of a stroke are low.")
        else
          alert("Your chances of getting a stroke are high, please consult a doctor!")
      })
    );
  }




  return (
    <div className="App">
      <div className="aboutPage">

        <section className="about-container">
          <br></br><br></br><h1> A B O U T &nbsp; B R A I N  &nbsp; S T R O K E S </h1>

          <p>
            A stroke is damage to the brain from interruption of its blood supply. It is a medical emergency
          </p>

          <p>
            Symptoms of stroke include trouble walking, speaking and understanding, as well as paralysis or numbness of the face, arm or leg.          </p>
          <p>
            Early treatment with medication like tPA (clot buster) can minimise brain damage. Other treatments focus on limiting complications and preventing additional strokes.
          </p>
        </section>


        <section className="causes">

          <h1> M A J O R  &nbsp; C A U S E S </h1>

          <section className="causes-container">
            <article>
              <img src={Bmi} />
              <h2>B M I</h2>
              <p>Obesity increases risk for stroke by several distinct mechanisms including diabetes mellitus, hypertension, accelerated atherosclerosis, atrial fibrillation, and obstructive sleep apnea. The end result may be progressive atherosclerosis and or or thromboembolism that may result in arterial occlusion or rupture.</p>
            </article>
            <article>
              <img src={Age} />
              <h2>A G E</h2>
              <p>The older you are, the more likely you are to have a stroke. The chance of having a stroke about doubles every 10 years after age 55. Although stroke is common among older adults, many people younger than 65 years also have strokes.</p>
            </article>
          </section>

          <section className="causes-container">
            <article>
              <img src={Smoke}></img>
              <h2>S M O K I N G</h2>
              <p>Smoking is a major cause of cardiovascular disease (CVD) and causes one of every four deaths from CVD. Secondhand smoke increases the risk for stroke by 20−30%. Each year, secondhand smoke exposure causes more than 8,000 deaths from stroke.</p>
            </article>
            <article>
              <img src={Glucose} alt="glucose"></img>
              <h2>D I A B E T E S</h2>
              <p>Diabetes is a well-established risk factor for stroke. It can cause pathologic changes in blood vessels at various locations and can lead to stroke if cerebral vessels are directly affected. Additionally, mortality is higher and poststroke outcomes are poorer in patients with stroke with uncontrolled glucose levels. </p>
            </article>
          </section>

        </section>
      </div>

      <div className="form-box">
        <form >
          <div className="form-container">

            <h1>ENTER  &nbsp; DETAILS</h1>
            <h1>TO  &nbsp; FIND &nbsp; CHANCES &nbsp; OF &nbsp; STROKE</h1>
            <br></br>
            <h3>NAME:</h3>
            <input type='text' name="Name" id="name" placeholder="Name" required></input><br></br>
            <h3>GENDER:</h3>
            <input type="text" id="gender" placeholder="Gender" list="genders" required />
            <datalist id="genders">
              <option>Male</option>
              <option>Female</option>
            </datalist><br></br>
            <h3>AGE:</h3>
            <input type='number' name="Age" id="age" placeholder="Age" required></input><br></br>
            <h3>HYPERTENSION:</h3>
            <input type='text' id="hypertension" placeholder="Hypertension (1 if true 0 if false)" list="hyper" required></input><br></br>
            <datalist id="hyper">
              <option>0</option>
              <option>1</option>
            </datalist><br></br>
            <h3>HEART DISEASE:</h3>
            <input type='text' id="heart" placeholder="Heart disease (1 if true 0 if false)" list="heartlist" required></input><br></br>
            <datalist id="heartlist">
              <option>0</option>
              <option>1</option>
            </datalist><br></br>
            <h3>MARITAL STATUS:</h3>
            <input type='text' id="marital" placeholder="Marital Status" list="maritallist" required></input><br></br>
            <datalist id="maritallist">
              <option>Yes</option>
              <option>No</option>
            </datalist><br></br>
            <h3>WORK STATUS:</h3>
            <input type='text' id="work" placeholder="Work status" list="worklist" required></input><br></br>
            <datalist id="worklist">
              <option>Private</option>
              <option>Self-employed</option>
              <option>Govt-job</option>
              <option>Children</option>
              <option>Never worked</option>
            </datalist><br></br>
            <h3>RESIDENCE TYPE:</h3>
            <input type='text' id="residence" placeholder="Residence type" list="residencelist" required></input><br></br>
            <datalist id="residencelist">
              <option>Urban</option>
              <option>Rural</option>
            </datalist><br></br>
            <h3>GLUCOSE LEVEL:</h3>
            <input type='number' name="Glucose" id="glucose" placeholder="Glucose Level" required></input><br></br>
            <h3>BMI:</h3>
            <input type='number' name="BMI" id="bmi" placeholder="BMI" required></input><br></br>
            <h3>SMOKING STATUS:</h3>
            <input type='text' id="smoking" placeholder="Smoking Status" list="smokinglist" required></input><br></br>
            <datalist id="smokinglist">
              <option>smokes</option>
              <option>never smoked</option>
              <option>formerly smoked</option>
              <option>Unknown</option>
            </datalist><br></br>

            <button type="button" className="submit" onClick={sendUserInfo}>Submit</button>
          </div>
        </form>
      </div>


    </div>
  );
}

export default App;
