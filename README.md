
<h1 align="center">
  🚀 &nbsp; C O D E S Y N C &nbsp; 🚀
</h1>

<p align="center">
  A web-based, real-time collaborative code editor.
  <br />
  Share a link, start a session, and bring your ideas to life, instantly.
</p>


## ✨ &nbsp; Core Features

* **🧑‍🤝‍🧑 &nbsp; Real-time Collaboration**: Type together in the same file, with changes reflected instantly for all participants.
* **⚡ &nbsp; Live Code Execution**: Run code in JavaScript, Python, Java, & C++ and see the output immediately.
* **🎨 &nbsp; Rich Editor Experience**: Enjoy syntax highlighting and a professional dark theme powered by CodeMirror.
* **🔗 &nbsp; Instant Session Sharing**: Generate a unique, shareable URL to invite collaborators to your coding session.
* **🔒 &nbsp; Secure API Handling**: API keys are kept safe using environment variables, not exposed client-side.


## 🛠️ &nbsp; Technology Stack

| Category      | Technology                                         |
| :------------ | :------------------------------------------------- |
| **Frontend** | `HTML5`, `CSS3`, `JavaScript`, `CodeMirror.js`     |
| **Backend** | `Node.js`, `Express.js`                            |
| **Real-time** | `Socket.IO`                                        |
| **Execution** | `Judge0 API` via `axios`                           |
| **Secrets** | `dotenv`                                           |


## 🚀 &nbsp; Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You'll need `Node.js` and `npm` installed on your machine. You will also need a free API key from RapidAPI for Judge0.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/YourUsername/your-repo-name.git](https://github.com/YourUsername/your-repo-name.git)
    cd your-repo-name
    ```

2.  **Install NPM packages:**
    ```bash
    npm install
    ```

3.  **Set up your environment variables:**
    * Create a file named `.env` in the root of the project.
    * Add your RapidAPI key to it:
        ```env
        RAPIDAPI_KEY=YOUR_API_KEY_GOES_HERE
        ```

4.  **Start the server:**
    ```bash
    node server.js
    ```

5.  Open your browser and navigate to `http://localhost:3000`.


## Usage

1.  Open the application to be redirected to a unique session URL.
2.  Share this URL with anyone you want to code with.
3.  Select your language, write code, and see it sync in real-time.
4.  Click the **▶ Run** button to execute and view the output.


## 🤝 &nbsp; Contributing

Contributions make the open-source community an amazing place to learn and create. Any contributions you make are **greatly appreciated**.

---
## 📄 &nbsp; License

Distributed under the MIT License. See `LICENSE` for more information.
