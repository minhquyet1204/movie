import React, { useEffect, useRef } from "react";

import "./header.scss";

import logo from "../../assets/logo.png";
import noUser from "../../assets/no-image-user.jpg";
import { FiBox } from "react-icons/fi";

import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserAuth";
import Button, { OutlineButton } from "../button/Button";
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
const Header = () => {
  const { user, handleLogOut, movies } = UserContext();
  const navigate = useNavigate();

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

  const logOut = async () => {
    await handleLogOut();

    navigate("/");
  };

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
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

        {user?.email ? (
          <div className="header__user">
            <div className="header__user-icon">
              <Link to="/favorite">
                {" "}
                <FiBox />
              </Link>

              <div className="header__user-icon-quantity">{movies?.length}</div>
            </div>

            <div className="header__user-div">
              <h4>{user?.displayName}</h4>
              <img
                src={user?.photoURL === null ? noUser : user?.photoURL}
                alt=""
              />

              <Button onClick={logOut} className="btn-user">
                Log out
              </Button>
            </div>
          </div>
        ) : (
          <div className="header__menu">
            <Link to="/login">
              <OutlineButton>Log in</OutlineButton>
            </Link>

            <Link to="/signup">
              <Button className="btn-right">Sign up</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
