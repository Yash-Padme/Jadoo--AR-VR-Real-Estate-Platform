# Jadoo AR/VR Real Estate Platform - Project Documentation

## 1. Project Overview
Jadoo is a modern, web-based AR/VR real estate platform designed to seamlessly connect the online digital space with physical properties. Evolving from an AR/VR showcase into an AI-assisted rental discovery platform (as detailed in the "Jadoo Update " document), it helps users discover, evaluate, compare, and shortlist rental properties using structured data, True Cost analysis, and virtual property tours.

## 2. Technical Architecture
The project transitioned to a modern MERN stack (MongoDB, Express.js, React, Node.js) with integrations for AI and Immersive VR.

*   **Frontend (Client):** React 18 (SPA), Tailwind CSS, daisyUI (for modern, responsive components), React Router, Framer Motion, Three.js & Panolens (for 360-degree VR tours).
*   **Backend (Server):** Node.js, Express.js (REST API), JWT for secure cookie-based authentication, Multer for file handling.
*   **Database:** MongoDB with Mongoose ORM.
*   **External Integrations:** 
    *   **Cloudinary:** For uploading and serving 360°/VR images.
    *   **Google Generative AI (Gemini):** For the smart property assistant.
*   **DevOps:** Deployed on Render (Backend), configured with GitHub Actions for CI/CD.

## 3. Core Features Implemented

### Phase 1: Database & Schema Evolution
*   **User Model:** Secure authentication using bcrypt hashing and JWT (Access & Refresh tokens).
*   **Property Model:** Upgraded to support comprehensive rental data, including `rent`, `deposit`, `maintenance`, `bhk` (String), `furnished`, `commuteTime`, `latitude`, and `longitude`.
*   **UserPreference Model:** Stores user onboarding data (city, budget, property type, max commute).
*   **Shortlist Model:** Links a User ID to an array of saved Property IDs for comparison.

### Phase 2: Core API Enhancements
*   **Advanced Search & Filtering:** Dynamic API endpoints supporting queries by budget, BHK, furnishing, locality, and max commute.
*   **True Cost Calculator:** Backend utility that dynamically calculates the True Monthly Cost (Rent + Maintenance + Estimated Utilities + Parking + Transport) before serving data to the client.
*   **Shortlist & Comparison:** APIs to toggle properties in a user's shortlist and fetch side-by-side comparison data.

### Phase 3: AI & Immersive Integration
*   **Jadoo AI Assistant:** An intelligent floating chat widget connected to the Gemini API. It can read a user's shortlisted properties or search the entire database to answer queries, compare true costs, and recommend properties.
*   **VR/360° Walkthroughs:** Seamless integration of Cloudinary URLs with Three.js/Panolens to render interactive virtual tours directly in the browser.

### Phase 4: Frontend UI Modernization
*   **daisyUI Integration:** Upgraded from raw CSS/HTML to a professional React UI using daisyUI components (Cards, Modals, Navbar, Hero sections).
*   **Dynamic Navigation:** A fully responsive Navbar that handles user login/logout session states using `AuthContext`.
*   **Property Discovery:** A grid-based tenant view displaying property cards with badges for BHK/Furnishing and highlighted True Monthly Costs.
*   **Property Upload Form:** An owner portal form capturing complete property data, including map coordinates (latitude/longitude) and VR image uploads.

## 4. Application Flow
1.  **Landing Page:** Users are greeted with a video background hero section and a clear call-to-action ("Get Started").
2.  **Authentication:** Users log in or register. JWT tokens are stored securely in localStorage/cookies.
3.  **Tenant Journey:**
    *   Users navigate to the "For Tenants" page.
    *   They apply advanced filters (Locality, Budget, BHK, Commute Time).
    *   They view properties and the calculated "True Monthly Cost".
    *   They click "Shortlist" to save properties of interest.
    *   They use the floating **Ask Jadoo AI** widget to compare shortlisted properties or ask natural language questions.
4.  **Owner Journey:**
    *   Users navigate to the "For Owners" page.
    *   They fill out a comprehensive property form, including standard details, financial costs, map coordinates, and upload a 360° image for the VR tour.

## 5. Current Scenario & Status
*   **Deployment:** The backend is successfully deployed on Render (`https://jadoo-ar-vr-real-estate-platform.onrender.com`).
*   **Frontend Integration:** All frontend API calls have been updated to point to the production server.
*   **Bug Fixes Completed:**
    *   Resolved MongoDB duplicate key errors by removing strict uniqueness on `area` and `contact` fields.
    *   Fixed casting errors by updating the `bhk` schema type to String.
    *   Resolved Webpack compilation errors by adding missing `ajv` modules.
    *   Fixed AI widget crashes on empty shortlists.
*   **Next Steps / Future Roadmap:** As per the "Jadoo Update " document, the foundation is completely stable. Future implementations will focus on Multiplayer Collaborative Tours, Dynamic AR Staging (furniture placement), and a 3D Floor Plan Generator.