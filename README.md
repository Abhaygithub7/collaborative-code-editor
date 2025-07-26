🚀 CodeSync - Real-Time Collaborative Code Editor
Welcome to CodeSync, a web-based code editor that lets you and your team write code together in real-time, from anywhere in the world. Share a link, start a session, and see your ideas come to life, instantly.



✨ Core Features
🧑‍🤝‍🧑 Real-time Collaboration: Type together in the same file, with changes reflected instantly for all participants.

⚡ Live Code Execution: Run your code in multiple languages (JavaScript, Python, Java, C++) and see the output immediately.

🎨 Rich Editor Experience: Enjoy syntax highlighting, line numbers, and a professional dark theme powered by CodeMirror.

🔗 Instant Session Sharing: Generate a unique, shareable URL to invite collaborators to your coding session.

🔒 Secure API Handling: API keys and secrets are kept safe using environment variables, not exposed in the client-side code.

🛠️ Tech Stack
Category	Technology
Frontend	HTML5, CSS3, JavaScript, CodeMirror.js
Backend	Node.js, Express.js
Real-time	Socket.IO
Execution	Judge0 API via axios
Secrets	dotenv

Export to Sheets
🚀 Getting Started
To get a local copy up and running, follow these simple steps.

Prerequisites
Node.js and npm installed (brew install node on macOS).

A free API key from RapidAPI for Judge0.

Installation
Clone the repository:

Bash

git clone https://github.com/YourUsername/your-repo-name.git
cd your-repo-name
Install NPM packages:

Bash

npm install
Set up your environment variables:

Create a file named .env in the root of the project.

Add your RapidAPI key to it:

Code snippet

RAPIDAPI_KEY=YOUR_API_KEY_GOES_HERE
Start the server:

Bash

node server.js
Open your browser and navigate to http://localhost:3000.

Usage
When you open the application, you will be redirected to a unique session URL.

Copy this URL and share it with anyone you want to code with.

Select your desired language, write your code, and see it sync in real-time.

Click the ▶ Run button to execute the code and view the output.

🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

📄 License
Distributed under the MIT License. See LICENSE for more information.
