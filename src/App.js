import React, { useState } from "react";
import { Success } from "./components/Success";
import { Users } from "./components/Users";
import "./index.scss";
// https://reqres.in/api/users
function App() {
  const [users, setUsers] = React.useState();
  const [isLoading, setIsloading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState("");
  const [invites, setInvites] = React.useState([]);
  const [success, setSuccess] = React.useState(false);

  const onChangeSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };

  const onClickSuccess = () => {
    setSuccess(true);
  };

  React.useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.data);
      })
      .catch((err) => {
        console.error(err);
        alert("Ошибка при выполнений");
      })
      .finally(() => {
        setIsloading(false);
      });
  }, []);

  return (
    <div className="App">
      {success ? (
        <Success count={invites.length} />
      ) : (
        <Users
          invites={invites}
          onClickInvite={onClickInvite}
          items={users}
          isLoading={isLoading}
          onChangeSearchValue={onChangeSearchValue}
          searchValue={searchValue}
          onClickSuccess={onClickSuccess}
        />
      )}
      {/* <Success /> */}
    </div>
  );
}

export default App;
