# 🛡️ Digital Sports Media Asset Protection Platform

A specialized Next.js web application designed for sports organizations to track, authenticate, and protect their high-value digital media assets. This platform provides a centralized command center to register official content, simulate web-wide propagation tracking, and manage copyright violations.

## 🌟 Overview

Sports organizations (clubs, leagues, broadcasters) produce high-value digital content—match highlights, player photos, official graphics—that often gets redistributed without permission. This platform empowers organizations to monitor their digital footprint in near real-time, providing tools for both protection and propagation analysis.

## 🚀 Core Features

- **📊 Intelligence Dashboard**: Real-time visualization of asset protection status, active scans, and detected violations using Recharts.
- **📁 Asset Registry**: A centralized catalog to manage official photos, videos, and graphics with automated status tracking (Protected, Violation Found, Scanning).
- **🔍 Simulated Deep Scan**: An interactive scanning engine that mimics web-crawling to identify unauthorized content use with precise similarity scoring.
- **⚖️ Violations Management**: A robust system to review flagged content, assess severity (High, Medium, Low), and track resolution workflows.
- **🛰️ Propagation Mapping**: A visual timeline and growth chart showing how assets spread across digital platforms (Twitter, Reddit, Blogs, etc.) from the point of origin.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **State Management**: React `useState` & `useReducer`
- **Data**: Local JSON-based Mock Data System

## 📁 Project Structure

```text
├── app/                 # Route segments (Dashboard, Assets, Scan, Violations, Propagation) & Global CSS
├── components/          # Atomic UI components (Sidebar, StatCards, Modals, Tables)
├── data/                # Mock JSON datasets (Assets, Violations, Propagation)
└── public/              # Static assets and icons
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Access the platform:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Prototype Status & Usage

This application is a **functional prototype** built for demonstration and workflow validation. 

- **Data Handling**: It uses a local state and JSON mock data system instead of a live database or real web crawlers.
- **Simulation**: The "Scan" functionality is simulated to demonstrate the user experience of web-wide asset tracking without requiring external API dependencies or active crawling infrastructure.
- **Theming**: Optimized for a high-contrast professional dark/light theme using Tailwind CSS primitives.

---

*Developed for the Digital Asset Protection Solution Challenge.*
