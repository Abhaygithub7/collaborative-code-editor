// server.js
require('dotenv').config();

// Import necessary modules
const express = require('express');
const http = require('http');
const { nanoid } = require('nanoid');
const { Server } = require("socket.io");
const axios = require('axios'); // <-- Add axios

// --- Server Setup ---
const app = express();
const server = http.createServer(app);
const io = new Server(server); 

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json()); // <-- Add this to parse JSON from the client

// --- Routing ---
// ... (Your existing routes for '/' and '/:sessionId' are here) ...
app.get('/', (req, res) => {
    const newSessionId = nanoid(10); 
    res.redirect(`/${newSessionId}`);
});

app.get('/:sessionId', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// --- Add the Code Execution Route ---
app.post('/run-code', async (req, res) => {
    const { code, languageId } = req.body;

    
    // Map our language names to Judge0 language IDs
    const languageMap = {
        'javascript': 93, // Node.js
        'python': 71,     // Python 3
        'java': 62,       // Java
        'cpp': 54         // C++
    };

    if (!languageMap[languageId]) {
        return res.status(400).json({ error: 'Unsupported language' });
    }

    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: { base64_encoded: 'false', fields: '*' },
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY, // <-- PASTE YOUR KEY HERE
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
        },
        data: {
            language_id: languageMap[languageId],
            source_code: code,
        }
    };

    // Replace your entire try...catch block with this one

    try {
        // First API call to create a submission
        const submissionResponse = await axios.request(options);
        const submissionToken = submissionResponse.data.token;

        // IMPORTANT: Only proceed if we get a token
        if (submissionToken) {
            // Poll for the result after a short delay
            setTimeout(async () => {
                const resultOptions = {
                    method: 'GET',
                    url: `https://judge0-ce.p.rapidapi.com/submissions/${submissionToken}`,
                    params: { base64_encoded: 'false', fields: '*' },
                    headers: {
                        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY, // Your key
                        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
                    }
                };
                
                try {
                    const resultResponse = await axios.request(resultOptions);
                    res.json(resultResponse.data);
                } catch (pollError) {
                    console.error('API Poll Error:', pollError);
                    res.status(500).json({ error: 'Failed to fetch execution result.' });
                }

            }, 2500);
        } else {
            // If for some reason we don't get a token
            res.status(500).json({ error: 'Failed to create submission.' });
        }

    } catch (error) {
        console.error('API Submission Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// --- End of Code Execution Route ---


// --- Socket.IO Connection Handling ---
// ... (Your existing io.on('connection', ...) code is here) ...
io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);

    socket.on('join-session', (sessionId) => {
        socket.join(sessionId);
        console.log(`User ${socket.id} joined session ${sessionId}`);
    });

    socket.on('code-change', (data) => {
        socket.to(data.sessionId).emit('code-update', data.code);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// --- Start the Server ---
server.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
