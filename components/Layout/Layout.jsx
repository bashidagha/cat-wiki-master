import Link from "next/link";
import React from "react";
import LogoContainer from "../UI/LogoContainer";

const Layout = (props) => {

  return (
    <div className="container">
      <Link href="/">
        <img src="/CatwikiLogo.svg" alt="logo" className="logo"></img>
      </Link>

      {props.children}

      <footer>
        <LogoContainer />
        <p>
          <span>&copy; </span>created by{" "}
          <a href="https://my-portfilio-beta.vercel.app/">bashidagha</a> -
          devChallenge.io 2021
        </p>
      </footer>
    </div>
  );
};

export default Layout;
