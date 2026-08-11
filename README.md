# 🚌 PMPML Bus Tracker

This is a simple **PMPML Bus Tracker** project built using Node.js and Express.

The application displays bus information and provides APIs to view, search, and add buses. It is a small project made to understand how a Node.js backend works with APIs.

## Features

- View PMPML buses
- Check total buses
- See buses that are on time or delayed
- Search for a bus by bus number
- Add a new bus using an API
- Simple web dashboard
- REST API using Express

## Technologies Used

- Node.js
- Express.js
- JavaScript
- HTML
- CSS
- REST API

## Project Structure

```text
pmpml-bus-tracker/
│
├── app.js
├── package.json
└── README.md
```

## How to Run

First, clone or download the project and open the project folder.

Install the required packages:

```bash
npm install
```

Start the application:

```bash
npm start
```

The server will start on port `3000`.

Open the browser and visit:

```text
http://localhost:3000
```

## API Endpoints

### Get all buses

```text
GET /api/buses
```

Example:

```text
http://localhost:3000/api/buses
```

### Get a specific bus

```text
GET /api/buses/:number
```

Example:

```text
http://localhost:3000/api/buses/101
```

### Add a new bus

```text
POST /api/buses
```


## How the Project Works

```text
User
  ↓
Web Dashboard
  ↓
Node.js + Express
  ↓
REST API
  ↓
Bus Data
```

The bus data is currently stored in the application itself, so no separate database is required.

## Project Screenshot

![Node.js PMPML Bus Tracker](Screenshot/nodejs.png)

## Author

**Tanvi Waghmare**

Computer Engineering Student
