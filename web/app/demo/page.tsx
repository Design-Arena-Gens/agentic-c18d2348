"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

type Classification = {
  label: string;
  match: boolean;
  probabilities: { label: string; probability: number }[];
};

export default function DemoPage() {
  const [isLoadingModel, setIsLoadingModel] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [inputText, setInputText] = useState("Bonjour ! ?crivez un texte ? analyser.");
  const [results, setResults] = useState<Classification[] | null>(null);
  const modelRef = useRef<any>(null);

  const toxicityThreshold = 0.85;
  const labelsFr = useMemo(
    () => ({
      identity_attack: "Attaque identitaire",
      insult: "Insulte",
      obscene: "Obsc?ne",
      severe_toxicity: "Toxicit? s?v?re",
      sexual_explicit: "Sexuellement explicite",
      threat: "Menace",
      toxicity: "Toxicit?",
    }),
    []
  );

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (modelRef.current || cancelled) return;
      try {
        setIsLoadingModel(true);
        const toxicity = await import("@tensorflow-models/toxicity");
        // Ensure tfjs is loaded in the browser context
        await import("@tensorflow/tfjs");
        const mdl = await toxicity.load(toxicityThreshold, []);
        if (!cancelled) {
          modelRef.current = mdl;
          setIsModelReady(true);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setIsLoadingModel(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [toxicityThreshold]);

  async function handleAnalyze() {
    if (!modelRef.current) return;
    const text = inputText.trim();
    if (!text) return;
    const predictions = await modelRef.current.classify([text]);
    const formatted: Classification[] = predictions.map((p: any) => {
      const probs = Array.from(p.results[0].probabilities as Float32Array).map(
        (prob: number, idx: number) => ({
          label: idx === 0 ? "false" : "true",
          probability: prob,
        })
      );
      const match =
        p.results[0].match ?? Boolean(p.results[0].probabilities?.[1] > toxicityThreshold);
      return {
        label: p.label as string,
        match,
        probabilities: probs,
      };
    });
    setResults(formatted);
  }

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto max-w-3xl px-6 py-12">
        <Link
          href="/"
          className="text-sm text-zinc-600 underline hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          ? Retour
        </Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          D?mo IA c?t? navigateur
        </h1>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Cette page utilise TensorFlow.js pour analyser un texte et d?tecter d??ventuels
          signaux de toxicit?. Tout s?ex?cute localement dans votre navigateur, sans cl? API.
        </p>

        <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
          <label htmlFor="text" className="text-sm font-medium">
            Votre texte
          </label>
          <textarea
            id="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-300 bg-white p-3 text-sm text-zinc-900 outline-none ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
            rows={6}
            placeholder="Saisissez un texte pour l?analyser..."
          />
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={handleAnalyze}
              disabled={!isModelReady || isLoadingModel}
              className="inline-flex items-center rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-200"
            >
              {isLoadingModel
                ? "Chargement du mod?le..."
                : isModelReady
                ? "Analyser le texte"
                : "Initialisation..."}
            </button>
            <span className="text-xs text-zinc-500">
              Seuil&nbsp;: {Math.round(toxicityThreshold * 100)}%
            </span>
          </div>
        </div>

        {results && (
          <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
            <h2 className="text-lg font-medium">R?sultats</h2>
            <ul className="mt-4 space-y-3">
              {results.map((r) => {
                const probTrue =
                  r.probabilities.find((p) => p.label === "true")?.probability ?? 0;
                return (
                  <li
                    key={r.label}
                    className="flex items-center justify-between rounded-lg border border-zinc-200 px-3 py-2 text-sm dark:border-zinc-800"
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {labelsFr[r.label as keyof typeof labelsFr] ?? r.label}
                      </span>
                      <span className="text-xs text-zinc-500">
                        Probabilit?: {(probTrue * 100).toFixed(1)}%
                      </span>
                    </div>
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        r.match
                          ? "bg-red-600/10 text-red-700 dark:bg-red-500/10 dark:text-red-300"
                          : "bg-emerald-600/10 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                      }`}
                    >
                      {r.match ? "D?tect?" : "Non d?tect?"}
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 text-xs text-zinc-500">
              ? des fins de d?monstration uniquement. Le mod?le est entra?n? principalement
              sur des donn?es en anglais et peut ?tre impr?cis en fran?ais.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
