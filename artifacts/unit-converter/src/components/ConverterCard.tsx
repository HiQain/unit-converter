import { useState, useMemo, useEffect } from "react";
import { ArrowRightLeft, Copy, Check } from "lucide-react";
import type { UnitDef } from "@/lib/converters";
import { formatNumber } from "@/lib/converters";

type Props = {
  title: string;
  description: string;
  accent: string;
  units: UnitDef[];
  defaultFrom: string;
  defaultTo: string;
  convert: (value: number, from: string, to: string) => number;
};

export function ConverterCard({
  title,
  description,
  accent,
  units,
  defaultFrom,
  defaultTo,
  convert,
}: Props) {
  const [from, setFrom] = useState(defaultFrom);
  const [to, setTo] = useState(defaultTo);
  const [input, setInput] = useState("1");
  const [copied, setCopied] = useState(false);

  const numeric = parseFloat(input);
  const valid = !isNaN(numeric) && input.trim() !== "";

  const result = useMemo(() => {
    if (!valid) return null;
    return convert(numeric, from, to);
  }, [numeric, valid, from, to, convert]);

  const fromUnit = units.find((u) => u.key === from);
  const toUnit = units.find((u) => u.key === to);

  const swap = () => {
    setFrom(to);
    setTo(from);
    if (result !== null && valid) {
      setInput(formatNumber(result));
    }
  };

  const copyResult = async () => {
    if (result === null) return;
    try {
      await navigator.clipboard.writeText(formatNumber(result));
      setCopied(true);
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
      <div
        className="px-6 py-5 border-b flex items-center gap-4"
        style={{ background: `linear-gradient(135deg, ${accent}15, transparent)` }}
      >
        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm shrink-0"
          style={{ backgroundColor: accent }}
        >
          {title.charAt(0)}
        </div>
        <div className="min-w-0">
          <h2 className="text-lg font-semibold text-card-foreground tracking-tight">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground truncate">{description}</p>
        </div>
      </div>

      <div className="p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
          {/* From */}
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              From
            </label>
            <input
              type="number"
              inputMode="decimal"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border bg-background text-foreground text-lg font-mono focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
              placeholder="0"
            />
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
            >
              {units.map((u) => (
                <option key={u.key} value={u.key}>
                  {u.label} ({u.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Swap */}
          <button
            type="button"
            onClick={swap}
            className="self-center justify-self-center w-10 h-10 rounded-full border bg-background hover:bg-accent transition flex items-center justify-center text-muted-foreground hover:text-foreground"
            title="Swap units"
            aria-label="Swap units"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>

          {/* To */}
          <div className="space-y-2">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              To
            </label>
            <div className="relative">
              <div className="w-full px-4 py-3 rounded-lg border bg-muted/40 text-foreground text-lg font-mono break-all min-h-[52px] flex items-center pr-12">
                {result !== null ? formatNumber(result) : "—"}
              </div>
              <button
                type="button"
                onClick={copyResult}
                disabled={result === null}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md hover:bg-accent transition flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed"
                title="Copy result"
                aria-label="Copy result"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition"
            >
              {units.map((u) => (
                <option key={u.key} value={u.key}>
                  {u.label} ({u.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {valid && result !== null && fromUnit && toUnit && (
          <div className="text-sm text-muted-foreground bg-muted/30 rounded-lg px-4 py-2.5 border">
            <span className="font-mono">
              {formatNumber(numeric)} {fromUnit.symbol}
            </span>
            <span className="mx-2">=</span>
            <span className="font-mono font-semibold text-foreground">
              {formatNumber(result)} {toUnit.symbol}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
