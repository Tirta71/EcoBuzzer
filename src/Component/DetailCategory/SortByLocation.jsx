import React from "react";

export default function SortByLocation({
  handleCityChange,
  selectedCity,
  locations,
  handleSort,
}) {
  React.useEffect(() => {
    handleSort();
  }, [selectedCity, handleSort]);

  // Filter out duplicate city names
  const uniqueCities = Array.from(
    new Set(locations.map((location) => location.Kota))
  );

  return (
    <>
      <div className="short mb-5">
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={handleCityChange}
          value={selectedCity}
        >
          <option value="0">Semua Lokasi</option>
          {uniqueCities.map((cityName, index) => (
            <option key={index} value={cityName}>
              {cityName}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
