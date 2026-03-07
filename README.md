# Workshop 02 – Building a Node.js HTTP Server
This project is part of Laurea's Full Stack Development course. The goal of this workshop was to learn the fundamentals of **Node.js HTTP server** and **manual routing** by building a simple web server from scratch without using any frameworks.

The server handles static files, custom routes, CSS and custom error pages.

## Topics Covered
- Node.js `http` module
- File system operations with `fs` module
- Path handling with `path` module
- HTTP status codes and headers
- MIME types for different file extensions
- Basic routing and error handling


## Features
- Serves a multiple HTML pages: homepage, about page, and contact page
- Loads CSS stylesheets for proper styling
- Displays custom 404 and 500 error pages
- Basic routing
- Path traversal protection for static files
- Clean console logging with clickable route links


## Project Structure

```
Workshop02_Nodejs/
├── starter/             # Your working directory
│   ├── server.js        # Main server file
│   ├── package.json     # Project configuration
│   └──public/           # Static files directory
│       ├── index.html   # Home page
│       ├── about.html   # About page
│       ├── contact.html # Contact page
│       ├── 404.html     # Custom 404 error page
│       ├── 500.html     # Custom 500 error page
│       └── styles/
│          └── style.css # Stylesheet
│
├── server.js            # Fully implemented server
│
└── README.md            # This file
```


## Tasks Completed

### ✅ Task 1 – Start the Server
I implemented the server startup logic using `server.listen()` and added console output showing the server URL and available routes with clickable links.

### ✅ Task 2 – Add Routing
I created simple routing using `if(else)` statements:
  - `/` → `index.html`
  - `/about` → `about.html`
  - `/contact` → `contact.html`
Any unknown route is forwarded to the 404 handler.

### ✅ Task 3 – Serve HTML Files
I used `fs.readFile()` to load HTML files from the `public` directory and returned them with correct MIME types and UTF-8 encoding. I also added error handling for missing files and server errors.

### ✅ Task 4 – Serve CSS Files
I added support for serving CSS files from `/styles/` folder and implemented path traversal security check.

### ✅ Task 5 – Error Handling
I implemented two error handling functions: `handle404()` function for "Page Not Found" errors and `handleServerError()` for "Internal Server Errors". Both functions attempt to serve their corresponding HTML error pages from the `public` directory. If the file is missing, they fall back to plain text. The `handleServerError()` function also logs the error details using `console.error()`.