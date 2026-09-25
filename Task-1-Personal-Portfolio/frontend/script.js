const API_URL = "http://localhost:5000/api";

async function loadProjects() {
    const container = document.getElementById("projects-container");

    try {
        const response = await fetch(`${API_URL}/projects`);

        const projects = await response.json();

        container.innerHTML = "";

        if (projects.length === 0) {
            container.innerHTML = "<p>No projects available.</p>";
            return;
        }

        projects.forEach(project => {

            const card = document.createElement("div");

            card.className = "project-card";

            card.innerHTML = `
                <h3>${project.title}</h3>

                <p>${project.description}</p>

                <p>
                    <strong>Technologies:</strong>
                    ${project.technologies.join(", ")}
                </p>

                <div class="project-links">

                    <a href="${project.githubLink}"
                       target="_blank">
                       GitHub
                    </a>

                    <a href="${project.liveLink}"
                       target="_blank">
                       Live Demo
                    </a>

                </div>
            `;

            container.appendChild(card);
        });

    } catch (error) {

        container.innerHTML =
            "<p>Unable to load projects. Please start the backend server.</p>";

        console.error(error);
    }
}


const contactForm = document.getElementById("contact-form");

contactForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const formMessage = document.getElementById("form-message");

    try {

        const response = await fetch(`${API_URL}/messages`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name,
                email,
                message
            })
        });

        const data = await response.json();

        if (response.ok) {

            formMessage.textContent = "Message sent successfully.";

            contactForm.reset();

        } else {

            formMessage.textContent =
                data.message || "Something went wrong.";

        }

    } catch (error) {

        formMessage.textContent =
            "Unable to connect to server.";

        console.error(error);
    }
});


loadProjects();