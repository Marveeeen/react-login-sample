import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const Home = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
    navigate('/linkpage');
  }
  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p> 
      <br />
      <Link to='/editor'>Go to the Editor Page</Link>
      <br />
      <Link to='/admin'>Go to the Admin Page</Link>
      <br />
      <Link to='/lounge'>Go to the Lounge</Link>
      <br />
      <Link to='/linkpage'>Go to the Link Page</Link>
      <div className="flexGrow">
        <button onClick={signOut}>Sign out</button>
      </div>
    </section>
  );
};

export default Home;
