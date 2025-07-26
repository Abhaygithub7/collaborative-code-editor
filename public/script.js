// public/script.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. Establish Socket.IO connection
    const socket = io();

    // 2. Initialize CodeMirror editor
    const editor = CodeMirror(document.getElementById('editor'), {
        mode: 'javascript',
        theme: 'material-darker',
        lineNumbers: true,
        autofocus: true,
    });

    // 3. Get session ID from the URL
    const sessionId = window.location.pathname.slice(1);

    // A flag to prevent an infinite loop of updates
    let isRemoteChange = false;

    // 4. Join the collaborative session
    socket.emit('join-session', sessionId);

    // 5. Listen for code updates from the server
    socket.on('code-update', (code) => {
        isRemoteChange = true;
        // Get current cursor position
        const cursor = editor.getCursor();
        // Replace the editor content with the updated code
        editor.setValue(code);
        // Restore the cursor position
        editor.setCursor(cursor);
        isRemoteChange = false;
    });

    // 6. Listen for local changes in the editor and send them to the server
    editor.on('change', (instance, change) => {
        // If the change was not triggered by a remote update, emit it
        if (!isRemoteChange) {
            const code = instance.getValue();
            socket.emit('code-change', { sessionId, code });
        }
    });

    // --- Language selection logic (will be used later) ---
    const languageSelect = document.getElementById('language-select');
    languageSelect.addEventListener('change', () => {
        const language = languageSelect.value;
        let mode = language;
        // Set the correct CodeMirror mode for C++/Java
        if (language === 'cpp' || language === 'java') {
            mode = 'text/x-c++src'; 
        }
        editor.setOption('mode', mode);
    });
    // --- Add the Run Button Logic ---
    const runBtn = document.getElementById('run-btn');
    const outputEl = document.getElementById('output');

    runBtn.addEventListener('click', async () => {
        const code = editor.getValue();
        const languageId = languageSelect.value;
        
        outputEl.textContent = 'Running...';
        outputEl.classList.remove('error');

        try {
            const response = await fetch('/run-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, languageId })
            });
            const result = await response.json();
            
            // Check for different kinds of output from the API
            if (result.stdout) {
                outputEl.textContent = result.stdout;
            } else if (result.stderr) {
                outputEl.textContent = result.stderr;
                outputEl.classList.add('error');
// Handle compilation errors specifically
            } else if (result.compile_output) {
                outputEl.textContent = result.compile_output;
                outputEl.classList.add('error');
            } else if (result.status.description === 'Accepted') {
                 outputEl.textContent = "Execution finished with no output.";
            } else {
                 outputEl.textContent = result.status.description;
                 outputEl.classList.add('error');
            }

        } catch (error) {
            outputEl.textContent = `An error occurred while connecting to the server.`;
            outputEl.classList.add('error');
        }
    });
});