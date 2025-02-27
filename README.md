# DummyJSON Data Viewer (Users & Products)

[![Vercel Deploy](https://vercel.com/button)](https://dummy-json-app.vercel.app/)

A React application built with Vite, TypeScript, and Tailwind CSS to display data fetched from the [DummyJSON API](https://dummyjson.com/). This project features reusable components for displaying and filtering data, along with pagination.

**Live Demo:** [https://dummy-json-app.vercel.app/](https://dummy-json-app.vercel.app/)

## Features

- **Data Display:** Displays user and product data in a tabular format.
- **Reusable Components:** Designed with reusable React components to minimize code duplication.
- **Filtering:**
  - **Page Size:** Dropdown to select the number of items per page (5, 10, 20, 50). Updates data and pagination.
  - **Client-Side Search:** Text input to filter data client-side.
  - **API Filters:** Filters data based on column values by sending requests to the DummyJSON API.
- **Pagination:** Allows users to navigate through pages of data. Uses API to fetch data for each page.
- **State Management:** Utilizes Redux Toolkit for efficient state management.
- **Responsive Design:** Layouts adapt to different screen sizes.

## Screenshots

- [Include a screenshot of the Users page here]
- [Include a screenshot of the Products page here]

## Tech Stack

- **Framework:** [React](https://reactjs.org/)
- **Bundler:** [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Data Fetching:** [Axios](https://axios-http.com/)
- **Deployment:** [Vercel](https://vercel.com/)

## Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/tripathi789308/dummy-json-app.git
    cd dummy-json-app
    ```

2.  **Install dependencies:**

    ```bash
    npm install  # or yarn install or pnpm install
    ```

## Usage

1.  **Start the development server:**

    ```bash
    npm run dev  # or yarn dev or pnpm dev
    ```

2.  **Open your browser and navigate to** `http://localhost:5173` (or the port Vite assigns).
