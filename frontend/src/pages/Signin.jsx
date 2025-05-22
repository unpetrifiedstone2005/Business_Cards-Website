import { Heading } from "../components/Heading"
import { Subheading } from "../components/Subheading"
import { InputComponent } from "../components/InputComponent"
import { Button } from "../components/Button"
import bgimage from '../assets/signin-bg-image.jpg'
import axios from 'axios'
import { useState } from "react"
import { useNavigate } from "react-router-dom"



export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    return <div 
          className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgimage})` }}
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
            <Heading label = {"Sign In"}/>
            <Subheading label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"}/>
            <InputComponent onChange={e => {
                setUsername(e.target.value)
            }} label={"Username"} placeholder={"John_Doe"} />
            <InputComponent onChange={e => {
                setPassword(e.target.value)
            }} label={"Password"} placeholder={"123456"} />
            <Button onClick={async() =>{
              try{
                const response = await axios.post('http://localhost:3000/api/v1/user/signin',{
                  username,
                  password
                })
                navigate("/Dashboard")
              }
              catch(err){
                console.error("Sign in failed:", err.message);
                alert("Signin failed. Please check your input or try again later.");
              }
            }} label = {"Sign in"}/>
          </div>
        </div>
}

