# Jadoo: Immersive AR/VR Real Estate Platform

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/Yash-Padme/Jadoo--AR-VR-Real-Estate-Platform/deploy.yml?branch=main&style=flat-square)](https://github.com/Yash-Padme/Jadoo--AR-VR-Real-Estate-Platform/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow.svg?style=flat-square)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![WebXR](https://img.shields.io/badge/Tech-WebXR--A--Frame-ff69b4.svg?style=flat-square)](https://aframe.io/)

**Jadoo** is a modern, web-based AR/VR platform designed for real estate agents to seamlessly connect the online digital space with physical, real-world properties. By leveraging web-native immersive technologies, Jadoo allows agents to showcase properties through fully interactive virtual reality (VR) tours and augmented reality (AR) spatial overlays—directly in any web browser without requiring external applications.

Designed as a production-ready, full-stack resume showcase, the project demonstrates robust software engineering principles, clean MVC architecture, interactive front-end design, and a fully automated continuous integration and continuous deployment (CI/CD) workflow.

---

## 🚀 Key Features

- **Immersive 3D/VR Virtual Walkthroughs**: Seamless 360-degree, fully interactive virtual property tours. Users can teleport through room hotspots, view realistic lighting, and inspect properties remotely from any VR headset or mobile device.
- **Augmented Reality Spatial Overlays**: Live AR overlay of structural dimensions, materials, and digital furniture placement inside real physical spaces using web-camera streams.
- **Agent Listing & Management Dashboard**: A responsive, web-based control panel where real estate agents can upload 3D assets, manage listing data, update pricing, and track prospective buyer engagement.
- **Web-Native Immersive Architecture**: Built on WebXR standards, requiring zero app store downloads. Features automatic fallback to standard 3D rendering for older browsers and non-compatible devices.
- **Automated CI/CD Workflow**: Continuous integration and deployment pipeline configured via GitHub Actions to automatically lint, build, and deploy changes on push.

---

## 🛠️ Technology Stack

Jadoo is implemented as a lightweight, modular full-stack JavaScript application:

### Front-End (Client)
- **HTML5 & CSS3**: Structured layouts, custom styling, responsive flexbox/grid interfaces, and interactive sliders.
- **JavaScript (ES6+)**: Core client-side application logic, state management, and real-time asset rendering.
- **WebXR / A-Frame**: Immersive rendering pipeline for 3D scenery, panoramic 360-degree image mapping, and headset controller tracking.

### Back-End (Server)
- **Node.js**: Asynchronous, event-driven runtime environment.
- **Express.js**: Clean RESTful API architecture for property listings, secure user authentication, and serving static asset payloads.

### DevOps & Infrastructure
- **GitHub Actions**: Fully automated deployment pipeline (`.github/workflows/`) triggers on git push events for continuous integration and rapid delivery.

---

## 📂 Project Structure

```directory
Jadoo--AR-VR-Real-Estate-Platform/
├── .github/
│   └── workflows/          # CI/CD deployment pipelines (GitHub Actions)
├── client/                 # Front-end client-side web application
│   ├── index.html          # Main application entrypoint
│   ├── css/                # Stylesheets and visual themes
│   ├── js/                 # WebXR, A-Frame, and UI interaction controllers
│   └── assets/             # 3D models (glTF/OBJ), textures, and 360° panoramas
├── server/                 # Back-end Node.js & Express REST server
│   ├── controllers/        # Request handling and business logic
│   ├── models/             # Property and user data schemas
│   ├── routes/             # RESTful API endpoint definitions
│   └── server.js           # Server entrypoint and express initialization
├── images/                 # Project screenshots, architectural diagrams, and assets
└── README.md               # Project documentation
```

---

## ⚙️ Installation & Local Setup

To run a local copy of Jadoo for development or demonstration purposes, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/) (v16.x or higher recommended)
- [npm](https://www.npmjs.com/) (Node Package Manager, bundled with Node.js)

### Step 1: Clone the Repository
```bash
git clone https://github.com/Yash-Padme/Jadoo--AR-VR-Real-Estate-Platform.git
cd Jadoo--AR-VR-Real-Estate-Platform
```

### Step 2: Configure the Backend Server
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) Configure your environment variables by creating a `.env` file:
   ```env
   PORT=5000
   NODE_ENV=development
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   The backend server will run by default on `http://localhost:5000`.

### Step 3: Launch the Frontend Client
1. In a new terminal tab, navigate to the client directory:
   ```bash
   cd ../client
   ```
2. Jadoo's front-end runs natively as a static web application. For WebXR and camera-based AR features to work properly, you should host it using a secure local web server (HTTPS or localhost).
3. Start a lightweight static server using `npx`:
   ```bash
   npx live-server
   ```
4. Open your browser and navigate to `http://127.0.0.1:8080`.

---

## 🔄 CI/CD Pipeline & Deployment

Jadoo includes a robust **GitHub Actions** deployment pipeline designed to mimic real-world development workflows:

- **Trigger**: Every push or merge request to the `main` branch automatically initiates the workflow.
- **Build and Test**: The pipeline pulls the code, installs dependencies, validates file structures, and lints scripts for potential errors.
- **Deploy**: On successful build, the workflow triggers an automated push-to-deploy script (`jadoo push to deploy 1`) to publish the updated front-end client and backend APIs to the hosting provider.

---

## 🗺️ Future Roadmap

- **Multiplayer Collaborative Tours**: Enable agents and clients to join the same VR walkthrough simultaneously with spatial voice chat.
- **Dynamic AR Staging**: Integrate an interactive furniture-and-decor marketplace allowing users to drag, drop, and buy real furniture from within their AR view.
- **3D Floor Plan Generator**: Automate the conversion of standard 2D property floor plans into WebXR-compatible 3D structures.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Yash Padme**
- GitHub: [@Yash-Padme](https://github.com/Yash-Padme)
- LinkedIn: [Yash Padme](https://linkedin.com/in/yash-padme)
