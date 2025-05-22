import { Heading } from "../components/Heading"
import { Subheading } from "../components/Subheading"
import { InputComponent } from "../components/InputComponent"
import { Button } from "../components/Button"
import bgimage from '../assets/signup-bg-image.jpeg'
import { Link } from "react-router-dom"

export const Signup = () => {
  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <Heading label={"Sign Up"} />
        <Subheading label={"Already have an account?"} buttonText={"Sign In"} to={"/"}/>
        <InputComponent label={"Username"} placeholder={"John_Doe"} />
        <InputComponent label={"Password"} placeholder={"123456"} />
        <InputComponent label={"First Name"} placeholder={"John"} />
        <InputComponent label={"Last Name"} placeholder={"Doe"} />
        <Link to = {"/Dashboard"}><Button label={"Sign up"} /></Link>
      </div>
    </div>
  );
};