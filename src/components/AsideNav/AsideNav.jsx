import React from "react";
import yoga from "./yoga.png";
import swim from "./swim.png";
import bike from "./bike.png";
import fitness from "./fitness.png";
import "./Asidenav.css";
export default function AsideNav() {
  return (
    <aside className="aside-container">
      <div className="icons-container">
        <a href="/">
          <img src={yoga} alt="icone 1" />
        </a>
        <a href="/">
          <img src={swim} alt="icone 2" />
        </a>
        <a href="/">
          <img src={bike} alt="icone 3" />
        </a>
        <a href="/">
          <img src={fitness} alt="icone 4" />
        </a>
      </div>
      <p> Copyright, SportSee 2020</p>
    </aside>
  );
}
