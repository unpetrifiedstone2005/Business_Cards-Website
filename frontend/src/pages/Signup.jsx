import { Heading } from "../components/Heading"
import { Subheading } from "../components/Subheading"
import { InputComponent } from "../components/InputComponent"
import { Button } from "../components/Button"
import bgimage from '../assets/signup-bg-image.jpeg'
import axios from 'axios'
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <Heading label={"Sign Up"} />
        <Subheading label={"Already have an account?"} buttonText={"Sign In"} to={"/"}/>
        <InputComponent onChange={e => {
          setUsername(e.target.value)
        }} label={"Username"} placeholder={"arya_dg"} />
        <InputComponent onChange={e => {
          setPassword(e.target.value)
        }} label={"Password"} placeholder={"123456"} />
        <InputComponent onChange={e => {
          setEmail(e.target.value)
        }} label={"Email"} placeholder={"arya@gmail.com"} />
        <InputComponent onChange={e => {
          setFirstName(e.target.value)
        }} label={"First Name"} placeholder={"John"} />
        <InputComponent onChange={e => {
          setLastName(e.target.value)
        }} label={"Last Name"} placeholder={"Doe"} />
        <Button label={"Sign up"} onClick = {async()=>{
          try{
            const response = await axios.post('http://3.107.76.182:3000/api/v1/user/signup',{
            username,
            password,
            email,
            firstName,
            lastName
          });
          localStorage.setItem("token",response.data.token)
          const token = localStorage.getItem("token");
          navigate("/dashboard")
          }
          catch(err){
            console.error("Signup failed:", err.message);
            alert("Signup failed. Please check your input or try again later.");
          }
        }}/>
      </div>
    </div>
  );
};
