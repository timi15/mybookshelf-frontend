# 📚 My Bookshelf

My Bookshelf is a modern web application that allows users to manage their personal book collection, track reading
progress, and organize books into custom lists such as **Loved** and **To Read**. The application is designed with a
clean, user-friendly interface and primarily targets Gen Z users.

This repository contains the **frontend** implementation of the My Bookshelf project.

## ✨ Features

- Browse and manage a personal book collection
- Discover **New York Times Bestseller** books on the home page *(via NYT Books API)*
- **Community-driven internal book library** that grows as users add reviews
- Add books to **Loved** and **To Read** lists
- Create, update, and delete book reviews
- Dashboard-style overview of reading activity
- Responsive and modern user interface

## 🛠 Technology Stack

- **Framework:** React
- **Language:** JavaScript *(ES6+)*
- **UI Library:** Material UI *(MUI)*
- **State Management:** React Context API
- **Authentication:** Firebase Authentication
- **HTTP Client:** Axios
- **External API:** New York Times Books API
- **Testing *(E2E)*:** Cypress
- **Build Tool:** npm *(Create React App)*
- **Deployment:** GitHub Pages

## 🧪 Testing

End-to-end (E2E) tests are implemented using **Cypress** to ensure the reliability of core user flows and UI
interactions.

### Running Cypress tests locally

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the application:
   ```bash
   npm start
   ```

3. In a separate terminal, run Cypress::
   ```bash
   npx cypress open
   ```

    or run tests in headless mode::
   ```bash
   npx cypress run
   ```

## 🌐 Live Demo

The application is deployed using **GitHub Pages** and is publicly available at:

https://timi15.github.io/mybookshelf/

## 🔗 Backend Integration

The frontend communicates with a Spring Boot–based REST API.

The backend source code is available here: [my-bookshelf-backend](https://github.com/timi15/mybookshelf-backend)

## 📄 License

This project is licensed under the **MIT License**.
