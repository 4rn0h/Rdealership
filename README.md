# React

A modern React-based project utilizing the latest frontend technologies and tools for building responsive web applications.

## 🚀 Features

- **React 18** - React version with improved rendering and concurrent features
- **Vite** - Lightning-fast build tool and development server
- **Redux Toolkit** - State management with simplified Redux setup
- **TailwindCSS** - Utility-first CSS framework with extensive customization
- **React Router v6** - Declarative routing for React applications
- **Data Visualization** - Integrated D3.js and Recharts for powerful data visualization
- **Form Management** - React Hook Form for efficient form handling
- **Animation** - Framer Motion for smooth UI animations
- **Testing** - Jest and React Testing Library setup
## Key Additions to vehicles details page
**Dynamic Vehicles Data**:
  - Centralized `vehiclesData.jsx` for flat vehicle records
  - Separate `vehicle_Specs.jsx` for grouped technical specifications
  - Support for **nested grouped specs** (engine, fuel, dimensions, storage)
- **Pricing System**:
  - Works with flat `price` fields or extended `pricing` objects
  - Supports **multi-currency (KES, TZS, GBP)** with conversion
  - Optional price history, financing, warranty, taxes, and more
- **Favorites & History**:
  - LocalStorage-powered favorites
  - Recently viewed vehicles with persistence
- **Authentication-ready**:
  - User session checks and redirect to login for restricted actions
- **Related Vehicles**:
  - Intelligent recommendation system by make/category

## 📋 Prerequisites

- Node.js (v14.x or higher)
- npm or yarn

## 🛠️ Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
   
2. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## 📁 Project Structure

```
react_app/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components
│   ├── styles/         # Global styles and Tailwind configuration
│   ├── App.jsx         # Main application component
│   ├── Routes.jsx      # Application routes
│   └── index.jsx       # Application entry point
├── .env                # Environment variables
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.js      # Vite configuration
```

## 🧩 Adding Routes

To add new routes to the application, update the `Routes.jsx` file:

```jsx
import { useRoutes } from "react-router-dom";
import HomePage from "pages/HomePage";
import AboutPage from "pages/AboutPage";

const ProjectRoutes = () => {
  let element = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "/about", element: <AboutPage /> },
    // Add more routes as needed
  ]);

  return element;
};
```

## 🎨 Styling

This project uses Tailwind CSS for styling. The configuration includes:

- Forms plugin for form styling
- Typography plugin for text styling
- Aspect ratio plugin for responsive elements
- Container queries for component-specific responsive design
- Fluid typography for responsive text
- Animation utilities

## 📱 Responsive Design

The app is built with responsive design using Tailwind CSS breakpoints.


## 📦 Deployment

Build the application for production:

```bash
npm run build
```

## 🙏 Acknowledgments

- Built with BlackTech_Inc
- Powered by React and Vite
- Styled with Tailwind CSS

Built with ❤️ for Royamotorsuk

## Key Additions to the Home page:

1. **Recent Updates Section**: Comprehensive documentation of all changes made
2. **Component Details**: Specific improvements to each major component
3. **Design System Documentation**: Explanation of the custom Tailwind classes
4. **Technical Improvements**: List of fixes and optimizations
5. **File Structure Context**: Better explanation of your project organization

## Recent Key Additions

**Vehicles Data Separation** – Flat records + grouped specs for cleaner architecture.
**VehicleSpecifications.jsx** – Refactored to read nested grouped specs dynamically.
**VehiclePricing.jsx** – Supports flat prices and extended pricing objects.
**Favorites & View History** – Added localStorage persistence for personalization.
**Multi-Currency Support** – KES, TZS, GBP with live conversion logic.
**Component Refactors** – Unified features naming, removed unused fields (variant, popularity, condition).
**Toast System **– Custom UI hook for notifications (use-toast).