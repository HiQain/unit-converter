export type UnitDef = {
  key: string;
  label: string;
  symbol: string;
};

export type LinearConverter = {
  units: UnitDef[];
  toBase: Record<string, number>;
};

export const length: LinearConverter = {
  units: [
    { key: "mm", label: "Millimeter", symbol: "mm" },
    { key: "cm", label: "Centimeter", symbol: "cm" },
    { key: "m", label: "Meter", symbol: "m" },
    { key: "km", label: "Kilometer", symbol: "km" },
    { key: "inch", label: "Inch", symbol: "in" },
    { key: "feet", label: "Feet", symbol: "ft" },
    { key: "yard", label: "Yard", symbol: "yd" },
    { key: "mile", label: "Mile", symbol: "mi" },
  ],
  toBase: {
    mm: 0.001,
    cm: 0.01,
    m: 1,
    km: 1000,
    inch: 0.0254,
    feet: 0.3048,
    yard: 0.9144,
    mile: 1609.344,
  },
};

export const weight: LinearConverter = {
  units: [
    { key: "kg", label: "Kilogram", symbol: "kg" },
    { key: "gram", label: "Gram", symbol: "g" },
    { key: "pound", label: "Pound", symbol: "lb" },
    { key: "ounce", label: "Ounce", symbol: "oz" },
  ],
  toBase: {
    kg: 1,
    gram: 0.001,
    pound: 0.45359237,
    ounce: 0.028349523125,
  },
};

export const area: LinearConverter = {
  units: [
    { key: "sqm", label: "Square Meter", symbol: "m\u00b2" },
    { key: "sqft", label: "Square Foot", symbol: "ft\u00b2" },
    { key: "acre", label: "Acre", symbol: "ac" },
    { key: "hectare", label: "Hectare", symbol: "ha" },
  ],
  toBase: {
    sqm: 1,
    sqft: 0.09290304,
    acre: 4046.8564224,
    hectare: 10000,
  },
};

export const volume: LinearConverter = {
  units: [
    { key: "liter", label: "Liter", symbol: "L" },
    { key: "ml", label: "Milliliter", symbol: "mL" },
    { key: "gallon", label: "US Gallon", symbol: "gal" },
    { key: "cubic_meter", label: "Cubic Meter", symbol: "m\u00b3" },
  ],
  toBase: {
    liter: 1,
    ml: 0.001,
    gallon: 3.785411784,
    cubic_meter: 1000,
  },
};

export const speed: LinearConverter = {
  units: [
    { key: "kmh", label: "Kilometers / hour", symbol: "km/h" },
    { key: "mph", label: "Miles / hour", symbol: "mph" },
    { key: "ms", label: "Meters / second", symbol: "m/s" },
  ],
  toBase: {
    kmh: 1 / 3.6,
    mph: 0.44704,
    ms: 1,
  },
};

export const pressure: LinearConverter = {
  units: [
    { key: "psi", label: "Pound / sq inch", symbol: "psi" },
    { key: "bar", label: "Bar", symbol: "bar" },
    { key: "pascal", label: "Pascal", symbol: "Pa" },
    { key: "kpa", label: "Kilopascal", symbol: "kPa" },
    { key: "atm", label: "Atmosphere", symbol: "atm" },
  ],
  toBase: {
    psi: 6894.757293168,
    bar: 100000,
    pascal: 1,
    kpa: 1000,
    atm: 101325,
  },
};

export const energy: LinearConverter = {
  units: [
    { key: "joule", label: "Joule", symbol: "J" },
    { key: "kj", label: "Kilojoule", symbol: "kJ" },
    { key: "calorie", label: "Calorie", symbol: "cal" },
    { key: "kcal", label: "Kilocalorie", symbol: "kcal" },
    { key: "kwh", label: "Kilowatt-hour", symbol: "kWh" },
  ],
  toBase: {
    joule: 1,
    kj: 1000,
    calorie: 4.184,
    kcal: 4184,
    kwh: 3600000,
  },
};

export function convertLinear(
  value: number,
  fromKey: string,
  toKey: string,
  c: LinearConverter,
): number {
  const base = value * c.toBase[fromKey];
  return base / c.toBase[toKey];
}

// Temperature (non-linear)
export const tempUnits: UnitDef[] = [
  { key: "C", label: "Celsius", symbol: "\u00b0C" },
  { key: "F", label: "Fahrenheit", symbol: "\u00b0F" },
  { key: "K", label: "Kelvin", symbol: "K" },
];

export function convertTemperature(
  value: number,
  from: string,
  to: string,
): number {
  let celsius: number;
  switch (from) {
    case "C":
      celsius = value;
      break;
    case "F":
      celsius = (value - 32) * (5 / 9);
      break;
    case "K":
      celsius = value - 273.15;
      break;
    default:
      celsius = value;
  }
  switch (to) {
    case "C":
      return celsius;
    case "F":
      return celsius * (9 / 5) + 32;
    case "K":
      return celsius + 273.15;
    default:
      return celsius;
  }
}

// Fuel efficiency: km/L <-> mpg (US gallon)
// 1 mpg = 0.425143707 km/L
export const fuelUnits: UnitDef[] = [
  { key: "kml", label: "Kilometers / Liter", symbol: "km/L" },
  { key: "mpg", label: "Miles / US Gallon", symbol: "mpg" },
  { key: "lp100", label: "Liters / 100 km", symbol: "L/100km" },
];

export function convertFuel(value: number, from: string, to: string): number {
  if (value === 0) return 0;
  // Normalize to km/L
  let kml: number;
  switch (from) {
    case "kml":
      kml = value;
      break;
    case "mpg":
      kml = value * 0.4251437074976;
      break;
    case "lp100":
      kml = 100 / value;
      break;
    default:
      kml = value;
  }
  switch (to) {
    case "kml":
      return kml;
    case "mpg":
      return kml / 0.4251437074976;
    case "lp100":
      return 100 / kml;
    default:
      return kml;
  }
}

export function formatNumber(n: number): string {
  if (!isFinite(n)) return "—";
  if (n === 0) return "0";
  const abs = Math.abs(n);
  if (abs >= 1e12 || abs < 1e-6) {
    return n.toExponential(6);
  }
  // Up to 8 significant digits, trim trailing zeros
  const fixed = n.toPrecision(8);
  return parseFloat(fixed).toString();
}
