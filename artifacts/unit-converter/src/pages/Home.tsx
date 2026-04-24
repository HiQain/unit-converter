import { useState } from "react";
import {
  Ruler,
  Weight,
  Thermometer,
  Square,
  Beaker,
  Gauge,
  Wind,
  Zap,
  Fuel,
  Moon,
  Sun,
} from "lucide-react";
import { ConverterCard } from "@/components/ConverterCard";
import {
  length,
  weight,
  area,
  volume,
  speed,
  pressure,
  energy,
  tempUnits,
  fuelUnits,
  convertLinear,
  convertTemperature,
  convertFuel,
} from "@/lib/converters";
import { Button } from "@/components/ui/button";

type CategoryKey =
  | "length"
  | "weight"
  | "temperature"
  | "area"
  | "volume"
  | "speed"
  | "pressure"
  | "energy"
  | "fuel";

const CATEGORIES: {
  key: CategoryKey;
  label: string;
  icon: typeof Ruler;
  color: string;
}[] = [
  { key: "length", label: "Length", icon: Ruler, color: "#2563eb" },
  { key: "weight", label: "Weight", icon: Weight, color: "#0891b2" },
  { key: "temperature", label: "Temperature", icon: Thermometer, color: "#dc2626" },
  { key: "area", label: "Area", icon: Square, color: "#16a34a" },
  { key: "volume", label: "Volume", icon: Beaker, color: "#7c3aed" },
  { key: "speed", label: "Speed", icon: Gauge, color: "#ea580c" },
  { key: "pressure", label: "Pressure", icon: Wind, color: "#0d9488" },
  { key: "energy", label: "Energy", icon: Zap, color: "#ca8a04" },
  { key: "fuel", label: "Fuel Efficiency", icon: Fuel, color: "#9333ea" },
];

export default function Home() {
  const [active, setActive] = useState<CategoryKey>("length");
  const [dark, setDark] = useState(false);
  const year = new Date().getFullYear();

  const toggleDark = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-sm">
              U
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Unit Converter</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                Fast, accurate conversions across 9 categories
              </p>
            </div>
          </div>
          <button
            onClick={toggleDark}
            className="w-10 h-10 rounded-lg border bg-background hover:bg-accent transition flex items-center justify-center"
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {dark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
          {/* Sidebar nav */}
          <nav className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-card border rounded-xl p-2 shadow-sm">
              <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Categories
              </div>
              <ul className="space-y-1">
                {CATEGORIES.map((cat) => {
                  const Icon = cat.icon;
                  const isActive = active === cat.key;
                  return (
                    <li key={cat.key}>
                      <button
                        onClick={() => setActive(cat.key)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-foreground hover:bg-accent"
                        }`}
                      >
                        <Icon
                          className="w-4 h-4 shrink-0"
                          style={{
                            color: isActive ? undefined : cat.color,
                          }}
                        />
                        {cat.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>

          {/* Converter content */}
          <section>
            {active === "length" && (
              <ConverterCard
                title="Length Converter"
                description="Millimeters, meters, miles and more"
                accent="#2563eb"
                units={length.units}
                defaultFrom="m"
                defaultTo="feet"
                convert={(v, f, t) => convertLinear(v, f, t, length)}
              />
            )}
            {active === "weight" && (
              <ConverterCard
                title="Weight Converter"
                description="Kilograms, pounds, ounces"
                accent="#0891b2"
                units={weight.units}
                defaultFrom="kg"
                defaultTo="pound"
                convert={(v, f, t) => convertLinear(v, f, t, weight)}
              />
            )}
            {active === "temperature" && (
              <ConverterCard
                title="Temperature Converter"
                description="Celsius, Fahrenheit, Kelvin"
                accent="#dc2626"
                units={tempUnits}
                defaultFrom="C"
                defaultTo="F"
                convert={convertTemperature}
              />
            )}
            {active === "area" && (
              <ConverterCard
                title="Area Converter"
                description="Square meters, acres, hectares"
                accent="#16a34a"
                units={area.units}
                defaultFrom="sqm"
                defaultTo="sqft"
                convert={(v, f, t) => convertLinear(v, f, t, area)}
              />
            )}
            {active === "volume" && (
              <ConverterCard
                title="Volume Converter"
                description="Liters, gallons, cubic meters"
                accent="#7c3aed"
                units={volume.units}
                defaultFrom="liter"
                defaultTo="gallon"
                convert={(v, f, t) => convertLinear(v, f, t, volume)}
              />
            )}
            {active === "speed" && (
              <ConverterCard
                title="Speed Converter"
                description="km/h, mph, m/s"
                accent="#ea580c"
                units={speed.units}
                defaultFrom="kmh"
                defaultTo="mph"
                convert={(v, f, t) => convertLinear(v, f, t, speed)}
              />
            )}
            {active === "pressure" && (
              <ConverterCard
                title="Pressure Converter"
                description="psi, bar, pascal, atm"
                accent="#0d9488"
                units={pressure.units}
                defaultFrom="bar"
                defaultTo="psi"
                convert={(v, f, t) => convertLinear(v, f, t, pressure)}
              />
            )}
            {active === "energy" && (
              <ConverterCard
                title="Energy Converter"
                description="Joule, calorie, kilowatt-hour"
                accent="#ca8a04"
                units={energy.units}
                defaultFrom="kwh"
                defaultTo="joule"
                convert={(v, f, t) => convertLinear(v, f, t, energy)}
              />
            )}
            {active === "fuel" && (
              <ConverterCard
                title="Fuel Efficiency Converter"
                description="km/L, mpg, L/100km"
                accent="#9333ea"
                units={fuelUnits}
                defaultFrom="kml"
                defaultTo="mpg"
                convert={convertFuel}
              />
            )}

            <p className="text-xs text-muted-foreground text-center mt-6">
              Conversions use standard internationally accepted ratios. Results
              are rounded for display.
            </p>
          </section>
        </div>
      </main>

      <footer className="border-t bg-card/50 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            © {year} Hiqain. All rights reserved.
          </p>
          <Button asChild>
            <a
              href="https://hiqain.com/"
              target="_blank"
              rel="noreferrer"
            >
              Powered By Hiqain Pvt Ltd
            </a>
          </Button>
        </div>
      </footer>
    </div>
  );
}
