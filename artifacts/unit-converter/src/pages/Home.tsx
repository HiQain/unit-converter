import { useState } from "react";
import {
  Beaker,
  Fuel,
  Gauge,
  Ruler,
  Square,
  Thermometer,
  Weight,
  Wind,
  Zap,
} from "lucide-react";
import { ConverterCard } from "@/components/ConverterCard";
import { SiteLayout } from "@/components/SiteLayout";
import {
  area,
  convertFuel,
  convertLinear,
  convertTemperature,
  energy,
  fuelUnits,
  length,
  pressure,
  speed,
  tempUnits,
  volume,
  weight,
} from "@/lib/converters";

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

  return (
    <SiteLayout>
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 w-full">
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
                        style={{ color: isActive ? undefined : cat.color }}
                      />
                      {cat.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

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
            Conversions use standard internationally accepted ratios. Results are
            rounded for display.
          </p>
        </section>
      </div>
    </SiteLayout>
  );
}
