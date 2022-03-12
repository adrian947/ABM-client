import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { ListMovements } from "../components/movements/ListMovements";
import { NewMovements } from "./../components/movements/NewMovements";


export const GridMovements = () => {
  const { auth, logOut } = useAuth();
  const [newMovement, setNewMovement] = useState([]);
  const [movements, setMovements] = useState([]);

  const handleLogOut = () =>{

    logOut()
  }


  return (
    <div>
      <header className='header'>
        <h1 className='header__title'>Movements</h1>
        <p className='header__auth'>Hi! {auth.name}</p>
        <button className="button" onClick={handleLogOut}>Log out</button>
      </header>
      <div className='grid'>
        <NewMovements setNewMovement={setNewMovement} movements={movements} />
        <ListMovements
          newMovement={newMovement}
          setNewMovement={setNewMovement}
          setMovements={setMovements}
          movements={movements}
        />
      </div>
    </div>
  );
};
