import React from "react";
import { Link } from "react-router-dom";
import "tw-elements-react/dist/css/tw-elements-react.min.css";

import LOGO from "../images/logoNew.png";
import CastleBG from "../images/chessCastle.png";
import { TEInput, TERipple } from "tw-elements-react";
import { XCircleIcon } from "@heroicons/react/24/solid";

const Login = () => {
    return (
      <>
      <section className="h-screen bg-cover bg-center flex justify-center items-center" style={{ backgroundImage: `url(${CastleBG})` }}>
        <div className="container h-[90%] ">
          <div className="g-6 flex h-1/2 flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
            <div className="w-8/12">
              <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                <div className="g-0 lg:flex lg:flex-wrap">
                  {/* <!-- Left column container--> */}
                  <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    {/* <!--Logo--> */}
                    <div className="text-center">
                      <img
                        className="mx-auto w-16"
                        src={LOGO}
                        alt="logo"
                      />
                      <h4 className="mb-6 mt-1 pb-1 text-lg font-semibold">
                        We are The Arty Mart Team
                      </h4>
                    </div>

                    <form>
                      <p className="mb-4">Please login to your account</p>
                      {/* <!--Username input--> */}
                      <TEInput
                        type="text"
                        label="Username"
                        className="mb-4"
                      ></TEInput>

                      {/* <!--Password input--> */}
                      <TEInput
                        type="password"
                        label="Password"
                        className="mb-4"
                      ></TEInput>

                      {/* <!--Submit button--> */}
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <TERipple rippleColor="light" className="w-full">
                          <button
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="button"
                            style={{
                              background:
                                "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                            }}
                          >
                            Log in
                          </button>
                        </TERipple>

                        {/* <!--Forgot password link--> */}
                        <a href="#!">Forgot password?</a>
                      </div>

                      {/* <!--Register button--> */}
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Don't have an account?</p>
                        <TERipple rippleColor="light">
                        <Link
                            to="/Register"
                          >
                          <button
                            type="button"
                            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                          >
                            Register
                          </button>
                        </Link>
                        </TERipple>
                      </div>
                    </form>
                  </div>
                </div>

                  {/* <!-- Right column container with background and description--> */}
                  <div
                    className="relative flex items-center rounded-b-lg lg:w-1/2 lg:rounded-r-lg lg:rounded-bl-none"
                    style={{
                      background:
                        "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                    }}
                  >
                    <button className="absolute top-2 right-2 mt-5 mr-1">
                      <Link
                        to="/"
                        className="text-white text-1xl font-semibold transition-transform transform-gpu hover:text-red-300"
                      >
                        <XCircleIcon className="w-8 h-8 mr-6 text-red-400 hover:text-red-600"/>
                      </Link>
                    </button>
                    <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                      <h4 className="mb-6 text-xl font-semibold">
                        We are more than just a company
                      </h4>
                      <p className="text-sm">
                        Join us to get free whatever we have lol
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </>
    )
}

export default Login;