// src/Components/AsteroidDetails.jsx
import { useEffect, useState } from "react";
import useAsteroidStore from "../other/useAsteroidStore";
import OrbitSimulation from "./orbit";

function AsteroidDetails() {
  const {
    asteroids,
    loadingAsteroids,
    fetchAsteroids,
    fetchAsteroidDetails,
    selectedAsteroid,

    speed,
    xdistance,
    ydistance,
    zdistance,
    size,

    setSpeed,
    setX,
    setY,
    setZ,
    setSize,
    setLaunched2,
    launched2,
    orbitpage,
    setOrbitpage,

    runSimulation,
  } = useAsteroidStore();

  const [selectedName, setSelectedName] = useState(
    selectedAsteroid?.name || ""
  );
  const [onOrbit, setOnOrbit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // ---- Load asteroid list on mount ----
  useEffect(() => {
    fetchAsteroids();
  }, []);

  // ---- Update dropdown selection when asteroid changes ----
  useEffect(() => {
    if (selectedAsteroid?.name) setSelectedName(selectedAsteroid.name);
  }, [selectedAsteroid]);

  // ---- Dropdown select ----
  const handleAsteroidSelect = (e) => {
    const name = e.target.value;
    setSelectedName(name);
    if (name) fetchAsteroidDetails(name);
  };

  // ---- Numeric input control ----
  const handleNumberInput = (setter) => (e) => {
    const value = e.target.value;
    if (value === "" || Number(value) >= 0) {
      setter(Number(value));
    }
  };

  // ---- Run Simulation ----
  const handleRunSimulation = () => {
    runSimulation?.(); // optional chaining if your store defines it
    setLaunched2(!launched2);
    console.log("Simulation triggered:", !launched2);
  };

  // ---- Toggle between Orbit ↔ Globe ----
  function togglePage() {
    setOnOrbit((prev) => {
      const next = !prev;

      if (next) {
        document.getElementById("toorbit").classList.remove("hidden");
        document.getElementById("toglobe").classList.add("hidden");
        document.getElementById("position").style.display = "none";
        document.getElementById("run_button").innerHTML = "Confirm changes";
      } else {
        document.getElementById("toorbit").classList.add("hidden");
        document.getElementById("toglobe").classList.remove("hidden");
        document.getElementById("position").style.display = "block";
        document.getElementById("run_button").innerHTML = "Run simulation";
      }

      setOrbitpage(!orbitpage);
      console.log("Orbit page toggled:", !orbitpage);
      return next;
    });
  }

  const filteredAsteroids =
    searchQuery.trim().length === 0
      ? asteroids
      : asteroids.filter((ast) =>
          ast.name?.toLowerCase().includes(searchQuery.trim().toLowerCase())
        );

  // ---- Render ----
  return (
    <div className="flex-1 p-8">
      <div className="max-w-md mx-auto bg-neutral-900 rounded-xl shadow-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold border-b border-neutral-700 pb-2">
          Asteroid Details
        </h2>

        <form className="space-y-4">
          {/* --- Search + Dropdown: Select Asteroid --- */}
          <div>
            <label className="block text-neutral-300 font-semibold mb-1">
              Search Asteroid
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Start typing a name..."
              className="w-full p-2 rounded bg-neutral-700 text-neutral-100 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500 mb-3"
            />
            <label className="block text-neutral-300 font-semibold mb-1">
              Select Asteroid
            </label>
            <select
              value={selectedName}
              onChange={handleAsteroidSelect}
              className="w-full p-2 rounded bg-neutral-700 text-neutral-100 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500"
            >
              {loadingAsteroids ? (
                <option value="">Loading asteroids...</option>
              ) : filteredAsteroids.length === 0 ? (
                <option value="">No asteroids match your search</option>
              ) : (
                <>
                  <option value="">-- Choose an asteroid --</option>
                  {filteredAsteroids.map((ast) => (
                    <option key={ast.name} value={ast.name}>
                      {ast.name}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>

          {/* --- Speed --- */}
          <div>
            <label className="block text-neutral-300 font-semibold mb-1">
              Speed (km/s)
            </label>
            <input
              type="number"
              min="0"
              value={speed}
              onChange={handleNumberInput(setSpeed)}
              className="w-full p-2 rounded bg-neutral-700 text-neutral-100 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500"
            />
          </div>

          {/* --- Position --- */}
          <div id="position">
            <label className="block text-neutral-300 font-semibold mb-1">
              Position (x, y, z)
            </label>
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                min="0"
                value={xdistance}
                onChange={handleNumberInput(setX)}
                className="w-full p-2 rounded bg-neutral-700 text-neutral-100 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500"
              />
              <input
                type="number"
                min="0"
                value={ydistance}
                onChange={handleNumberInput(setY)}
                className="w-full p-2 rounded bg-neutral-700 text-neutral-100 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500"
              />
              <input
                type="number"
                min="0"
                value={zdistance}
                onChange={handleNumberInput(setZ)}
                className="w-full p-2 rounded bg-neutral-700 text-neutral-100 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500"
              />
            </div>
          </div>

          {/* --- Size --- */}
          <div>
            <label className="block text-neutral-300 font-semibold mb-1">
              Size (Km)
            </label>
            <input
              type="number"
              min="0"
              value={size}
              onChange={handleNumberInput(setSize)}
              className="w-full p-2 rounded bg-neutral-700 text-neutral-100 border border-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-500"
            />
          </div>

          {/* --- Run Simulation Button --- */}
          <div className="pt-4">
            <button
              id="run_button"
              type="button"
              onClick={handleRunSimulation}
              className="w-full py-2 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded shadow transition-all duration-300 hover:cursor-pointer"
            >
              Run Simulation
            </button>
          </div>

          {/* --- Navigation Buttons --- */}
          <div className="pt-4" id="toglobe">
            <a href="#globe">
              <button
                type="button"
                onClick={togglePage}
                className="w-full py-2 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded shadow transition-all duration-300 hover:cursor-pointer"
              >
                To asteroid launcher
              </button>
            </a>
          </div>

          <div className="pt-4 hidden" id="toorbit">
            <a href="#orbit">
              <button
                type="button"
                onClick={togglePage}
                className="w-full py-2 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded shadow transition-all duration-300 hover:cursor-pointer"
              >
                To Orbit
              </button>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AsteroidDetails;
