const About = () => {
    return (
        <>
            <div className="App">
                
            <h1>About Jira-at-Home</h1>
            <p>
                <strong>Jira-at-Home</strong> is a personal task management application inspired by Jira, designed for individuals and small teams who want to organize tasks visually using a Kanban-style board.
            </p>

            <h2>Deployment</h2>
            <p>
                The frontend of Jira-at-Home is built with React and deployed on <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">Vercel</a>, allowing for fast, global delivery with automatic CI/CD integration.
            </p>

            <h2>Backend and API</h2>
            <p>
                The backend is a RESTful API developed using <strong>Node.js</strong> and <strong>Express</strong>, and it is hosted on <a href="https://render.com" target="_blank" rel="noopener noreferrer">Render</a>. This server handles all core logic and communicates with the PostgreSQL database to manage users, boards, and tasks.
            </p>

            <h2>Database</h2>
            <p>
                Jira-at-Home uses a full CRUD (Create, Read, Update, Delete) database built on <a href="https://neon.tech" target="_blank" rel="noopener noreferrer">Neon</a> with <strong>PostgreSQL</strong>. This database stores all application data, including user profiles, boards, and the tasks within each board.
            </p>

            <h2>Drag-and-Drop Functionality</h2>
            <p>
                At the core of Jira-at-Home is its intuitive drag-and-drop interface powered by the <strong>react-beautiful-dnd</strong> library. Users can seamlessly move tasks between columns like "To Do," "In Progress," and "Completed," enabling a smooth workflow experience similar to enterprise project tools.
            </p>

            <p>
                Whether you're managing household chores, personal projects, or collaborative tasks, Jira-at-Home brings structure and visibility to your daily productivity.
            </p>


            </div>
        </>
    );
  };
  
  export default About;