const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// MIME types for different file extensions
const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json'
};

// HTTP server
const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    try {

        // ========================================
        // Task 2 - Route Mapping
        // ========================================
        // Map URLs to HTML files in the public folder
    
        let filePath;
        if (req.url === '/') {
            // Home page
            filePath = path.join(PUBLIC_DIR, 'index.html');
        } else if (req.url === '/about') {
            // About page
            filePath =path.join(PUBLIC_DIR, 'about.html');
        } else if (req.url === '/contact') {
            // Contact page
            filePath = path.join(PUBLIC_DIR, 'contact.html');
        }
        
        // ========================================
        // Task 4 - Serve CSS Files
        // ========================================
        // Handle requests for CSS files from /styles/ folder
        // Uncomment and complete the security check:
        
        else if (req.url.startsWith('/styles/')) {
            filePath = path.join(PUBLIC_DIR, req.url);
            
            // Security check
            const normalizedPath = path.normalize(filePath);
            if (!normalizedPath.startsWith(PUBLIC_DIR)) {
                handle404(res);
                return;
            }
        }

        else {
            // No route matched -> 404
            handle404(res);
            return;
        }

        // ========================================
        // Task 3 - Serve Files
        // ========================================
        // Read the file and send it to the client
        
        // Get the file extension (e.g., '.html', '.css')
        const extname = path.extname(filePath);
        
        // Get the content type from MIME_TYPES object
        const contentType = MIME_TYPES[extname] || 'text/html';

        // Read the file
        fs.readFile(filePath, (err, content) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    // File not found
                    handle404(res);
                } else {
                    // Server error
                    handleServerError(res, err);
                }
            } else {
                // Send success response             
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });

    } catch (error) {
        // Catch any unexpected errors
        handleServerError(res, error);
    }
});


// ========================================
// TODO: Task 5 - Error Handling Functions
// ========================================

// Function to handle 404 errors (Page Not Found)
function handle404(res) {
    // Path to 404.html
    const notFoundPath = path.join(PUBLIC_DIR, '404.html');
    
    // Read and serve the 404.html file
    fs.readFile(notFoundPath, (err, content) => {
        if (err) {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('404 - Page Not Found');
            } else {
                res.writeHead(404, {'Content-Type' : 'text/html'});
                res.end(content, 'utf-8');
            }
    });

}

// Function to handle 500 errors (Server Error)
function handleServerError(res, error) {
    // Log the error to the console
    console.log(`500 - Server Error`);
    console.error(error);
    
    // Path to 500.html
    const serverErrorPath = path.join(PUBLIC_DIR, '500.html');
    
    // Read and serve the 500.html file
    fs.readFile(serverErrorPath, (err, content) => {
        if (err) {
                res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('500 - Internal Server Error');
            } else {
                res.writeHead(500, {'Content-Type' : 'text/html'});
                res.end(content, 'utf-8');
            }
    });   
}

// ========================================
// TODO: Task 1 - Start the Server
// ========================================
// Start listening for requests on PORT 3000
server.listen(PORT, () => {
    // Log a message to indicate the server is running
    console.log(`Server is running on http://localhost:${PORT}`);    
    
    // Bonus: Log available routes
    console.log('Available routes:');
    console.log(`  GET /              -> http://localhost:${PORT}/`);
    console.log(`  GET /about         -> http://localhost:${PORT}/about`);
    console.log(`  GET /contact       -> http://localhost:${PORT}/contact`);
});