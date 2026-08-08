# Auto-DS 🤖📊

**AI-powered Data Science assistant** — upload a CSV, describe your goal, and get a custom analysis roadmap plus ready-to-run Python code.

## Overview

Auto-DS uses **Google Gemini** to understand your dataset and goals, then:
- Analyzes your CSV data
- Builds a **custom roadmap** based on what you want to achieve
- **Generates Python code** you can run for the analysis

## Tech Stack

- React 19 + Vite
- TypeScript
- Google Gemini (`@google/genai`)
- PapaParse (CSV parsing)
- Tailwind CSS

## Features

- 📤 Upload your dataset (CSV)
- 🎯 Describe your analysis goal in plain language
- 🗺️ Receive a step-by-step data science roadmap
- 🐍 Get generated Python code for each step

## Getting Started

```bash
npm install
npm run dev
```

> Requires a Google Gemini API key.

## License

Free to use and modify.
