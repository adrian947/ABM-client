import React, { useEffect, useState } from "react";
import { tokenAuth } from "../../axios/authTokenHeaders";
import clientAxios from "../../axios/clientAxios";
import { MovementsCard } from "./MovementsCard";

export const ListMovements = ({
  newMovement,
  setNewMovement,
  setMovements,
  movements,
}) => {
  const [updateMovement, setUpdateMovement] = useState(false);

  useEffect(() => {
    const getMovements = async () => {
      try {
        const { data } = await clientAxios.get("/movements", tokenAuth());

        setMovements(data.movements);
      } catch (error) {
        console.log("error", error.response.data);
      }
    };
    getMovements();
  }, [newMovement.length, updateMovement]);

  if (movements.length === 0) return null;

  return (
    <div>
      {movements.map((m) => (
        <MovementsCard
          key={m.id}
          movement={m}
          setNewMovement={setNewMovement}
          setUpdateMovement={setUpdateMovement}
          updateMovement={updateMovement}
        />
      ))}
    </div>
  );
};
