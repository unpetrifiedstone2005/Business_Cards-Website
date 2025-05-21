import { Heading } from "../components/Heading"
import { Subheading } from "../components/Subheading"
import { InputComponent } from "../components/InputComponent"
import { Button } from "../components/Button"
import bgimage from '../assets/signin-bg-image.jpg'

export const Signin = () => {
    return <div 
          className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgimage})` }}
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
            <Heading label = {"Sign In"}/>
            <Subheading label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"}/>
            <InputComponent label={"Username"} placeholder={"John_Doe"} />
            <InputComponent label={"Password"} placeholder={"123456"} />
            <Button label = {"Sign in"}/>
          </div>
        </div>
}

