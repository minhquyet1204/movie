import React, { useEffect, useRef } from "react";

import "./header.scss";

import logo from "../../assets/tmovie.png";
import { Link, NavLink } from "react-router-dom";
import Button, { OutlineButton } from "../button/Button";
const Header = () => {
  const headerNav = [
    {
      display: "Home",
      path: "/",
    },
    {
      display: "Movies",
      path: "/movie",
    },
    {
      display: "TV Series",
      path: "/tv",
    },
  ];

  const headerRef = useRef();

  const changeNavHeader = () => {
    if (window.scrollY > 200) {
      headerRef.current.classList.add("shrink");
    } else {
      headerRef.current.classList.remove("shrink");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavHeader);

    return () => {
      window.removeEventListener("scroll", changeNavHeader);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <ul className="header__nav">
          {headerNav.map((e, i) => (
            <li key={i}>
              <NavLink
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
                to={e.path}
              >
                {e.display}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="header__menu">
          <OutlineButton>
            <Link to="/login">Log in</Link>
          </OutlineButton>

          <Button className="btn-right">
            <Link to="/signup">Sign up</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
