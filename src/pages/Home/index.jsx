import React, { useState, useEffect, useReducer } from 'react'
import './style.css'
 import {Card} from '../../components/Card/index'

function Home() {
  
  const [studentName, setStudentName] = useState();
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({ name:"", avatar: "",})

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      })
    };

    setStudents((prevState) => [...prevState, newStudent]);
  }

  useEffect(() => {
    fetch("https://api.github.com/users/carlos-juni0r")
    .then((response) => response.json())
    .then((data) => {
      setUser({
        name: data.login,  //aqui troquei por data.login pois n tem name na minha conta
        avatar: data.avatar_url,
      });
    });
  }, []); 

  return (
   <div className="container"> 
    <header>
      <h1>Talvez uma lista de presença {studentName}</h1>
      <div>
        <strong>{user.name}</strong>
        <img src={user.avatar} alt="Foto de perfil" />
      </div>
    </header>

      
      <input type="text" placeholder="Digite seu nome..." onChange={e =>setStudentName(e.target.value)}/>
      <button type="button" onClick={handleAddStudent}> adicionar </button>

      {students.map((student) => (
                <Card key={student.time} name={student.name} time={student.time}/>

      ))
        
        

      }
   </div>
  )
}

export default Home
