import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const User = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          cancelToken: source.token,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        if (isMounted) {
          console.error(err);
          navigate("/login", { state: { from: location }, replace: true });
        }
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      source.cancel('Cancel Token');
    };
  }, []);

  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
};

export default User;
