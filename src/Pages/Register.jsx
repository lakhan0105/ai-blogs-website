import React from "react";
import { Link } from "react-router";
import FormRow from "../Components/FormRow";
import { Button } from "../Components";
import bgImg from "../assets/login-page-bg.webp";
import { useMyContext } from "../Context/ContextProvider";

function Register() {
  const { formInput, setFormInput, handleFormInput } = useMyContext();

  return (
    <section className="">
      <div className="flex">
        {/* img container */}
        <div className="h-screen w-[65%] ">
          <img
            src={bgImg}
            alt="not found"
            className="object-cover h-full w-full"
          />
        </div>

        {/* form container */}
        <div className="self-center mx-auto w-full max-w-[350px]">
          <h2 className="text-2xl font-semibold">Create an Account</h2>
          <p className="text-sm mt-2">
            Already a member?{" "}
            <Link to={"/login"} className="text-blue-400 hover:underline">
              Login
            </Link>
          </p>

          <form className="mt-12 w-full  rounded-md">
            <FormRow
              label={"First name"}
              type={"text"}
              name={"fname"}
              value={formInput.fName}
              onChange={handleFormInput}
            />
            <FormRow
              label={"Email address"}
              type={"email"}
              name={"email"}
              value={formInput.email}
              onChange={handleFormInput}
            />
            <FormRow
              label={"Password"}
              type={"password"}
              name={"password"}
              value={formInput.password}
              onChange={handleFormInput}
            />

            {/* <button type="submit">login</button> */}
            <Button extraStyles={"w-full rounded-md mt-4"}>Register</Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;
