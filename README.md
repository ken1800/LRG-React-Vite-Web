# React + TypeScript + Vite Project

Welcome to the **LRG-web-project** project! This README will guide you through the installation, setup, and usage of the project.

---

## Prerequisites

Ensure you have the following installed on your machine:

1. **Node.js** (v16 or higher)  
   [Download Node.js](https://nodejs.org/)  
2. **npm** (comes with Node.js) or **yarn**  

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

Replace `<repository-url>` with your Git repository URL and `<project-folder>` with the name of the folder where the project will reside.

---

### 2. Install Dependencies

Run the following command to install the project dependencies:  

```bash
npm install
```

Alternatively, if you're using `yarn`:

```bash
yarn install
```

---

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project and define the following variables:

```plaintext
APP_ID=<your-app-id>
BASE_URL=<your-base-url>
```

- `APP_ID`: Replace `<your-app-id>` with the application ID you want to use.  
- `BASE_URL`: Replace `<your-base-url>` with the base URL for your API or backend service.  

### Example `.env` file:

```plaintext
APP_ID=123456
BASE_URL=https://api.example.com
```

---

### 4. Start the Development Server

Run the following command to start the development server:

```bash
npm run dev
```

Or, if you're using `yarn`:

```bash
yarn dev
```

The development server will be available at:  
[http://localhost:5173](http://localhost:5173)
