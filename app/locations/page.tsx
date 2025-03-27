"use client";
import React, { useEffect } from "react";
import { useLocaionsStore } from "../stores/stores";
const LocationsPage = () => {
  const locations = useLocaionsStore((state) => state.locations);

  return (
    <div>
      <h1>Locations Page</h1>
      <div className="locations-cards">
        {locations.map((location) => (
          <div key={location.id} className="location-card">
            <h2>{location.name}</h2>
            <p>{location.manager.name}</p>
            <p>{location.manager.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationsPage;
