import React, { useEffect } from "react";
import FormRow from "../Components/FormRow";
import { Button } from "../Components/index";
import { Link, useNavigate } from "react-router";
import bgImg from "../assets/login-page-bg.webp";
import { useMyContext } from "../Context/ContextProvider";

function Login() {
  const { formInput, handleFormInput, loginUser, currUser } = useMyContext();
  const navigate = useNavigate();

  // check if the user is already present
  useEffect(() => {
    if (currUser) {
      navigate("/");
    }
  }, [currUser, navigate]);

  // handleLogin
  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await loginUser();
    if (result.success) {
      navigate("/");
    }
  };

  return (
    <section className="">
      <div className="flex">
        {/* img container */}
        <div className="h-screen w-[65%] ">
          <img src={bgImg} alt="" className="object-cover h-full w-full" />
        </div>

        {/* form container */}
        <div className="self-center mx-auto w-full max-w-[350px]">
          <h2 className="text-2xl font-semibold">Login to your Account</h2>
          <p className="text-sm mt-2">
            Not a member?{" "}
            <Link to={"/register"} className="text-blue-400 hover:underline">
              Register
            </Link>
          </p>

          <form className="mt-12 w-full  rounded-md">
            <FormRow
              label={"Email address"}
              type={"email"}
              name={"email"}
              value={formInput?.email}
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
            <Button
              extraStyles={"w-full rounded-md mt-4"}
              handleOnClick={handleLogin}
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
