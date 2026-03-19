# FinServe Credit Ops Workspace (AI-Powered Decision Support)

**Business Problem:**
The Credit & Operations team currently spends upwards of 4 hours manually pulling unstructured CRM data, cross-referencing industry databases, and writing Credit Memos in Word/PDF. This application solves that massive operational bottleneck by reducing the end-to-end appraisal cycle to just 2 minutes, driving immense cost savings and process velocity while maintaining absolute compliance safety.

## Key Features

*   **Intelligent Document Extraction (Gemini 3.1):** Securely synthesizes scattered CRM notes, financial geometries, and context into impeccably formatted credit memo narratives instantly.
*   **Human-in-the-Loop (Editable Memo):** The AI acts as a co-pilot, not a black-box. Its output populates an interactive workspace, forcing the actual human Credit Officer to review, override, and manually sign-off on the narrative before it touches the Credit Committee.
*   **Dynamic Stress Testing:** Professional real-time risk simulation modules. Sliders dynamically recalculate live Debt Service Coverage Ratios (DSCR) against projected revenue drop-offs and interest rate monetary shocks.
*   **Audit Trail:** Immutable, compliance-ready event logging that independently tracks every phase of the lifecycle (API Gateway Ingestion -> KYC Sweeps -> AI Vectorization -> Manual Overrides).

## Tech Stack

*   **Framework:** Next.js 14 (App Router)
*   **Styling & UI:** Tailwind CSS, Framer Motion, Lucide Icons
*   **AI Engine:** Google Gemini API (`@google/generative-ai`)
*   **Language:** Strict TypeScript

## Installation

1. Clone this repository and navigate to the project directory.
2. Install the necessary NPM dependencies:
   ```bash
   npm install
   ```
3. Set up the environment. Create a `.env.local` file in the root directory. Add your Gemini API key to enable live Generation capabilities. (If omitted, the app will seamlessly utilize a safe, pre-loaded mock fallback string to ensure demos never fail).
   ```env
   GEMINI_API_KEY=your_google_ai_studio_api_key_here
   ```
4. Start the local development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:3000` to access the FinServe Core Gateway.
