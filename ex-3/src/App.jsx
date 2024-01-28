import { useState, useEffect } from "react";

function App() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("http://localhost:3000/projects");
        if (!res.ok) {
          throw new Error("Could not retrieve projects data");
        }

        const data = await res.json();
        setProjects(data.data.projects);
      } catch (err) {
        setError("Could not retrieve projects data");
      }
    }

    fetchProjects();
  }, []);

  const handleEditProject = async (project) => {
    try {
      const res = await fetch(`http://localhost:3000/projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });

      if (!res.ok) {
        throw new Error("Could not update project");
      }

      const data = await res.json();
      const updatedProjectData = data.data.project;
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === updatedProjectData.id ? updatedProjectData : project
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditButtonClick = (project) => {
    const newName = prompt("Enter new name", project.name);
    const newDescription = prompt("Enter new description", project.description);
    const newDueDate = prompt("Enter new due date", project.dueDate);

    const updatedProject = {
      ...project,
      name: newName,
      description: newDescription,
      dueDate: newDueDate,
    };
    handleEditProject(updatedProject);
  };

  const handleDeleteProject = async (project) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the project: ${project.name}?`
    );
    if (isConfirmed) {
      try {
        const res = await fetch(
          `http://localhost:3000/projects/${project.id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!res.ok) {
          throw new Error("Could not update project");
        }

        setProjects((prevProjects) =>
          prevProjects.filter((proj) => proj.id !== project.id)
        );
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProject = {
      name: e.target.title.value,
      description: e.target.description.value,
      dueDate: e.target["due-date"].value,
    };

    try {
      const res = await fetch("http://localhost:3000/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });

      if (!res.ok) {
        throw new Error("Could not add new project");
      }

      const data = await res.json();
      setProjects((prevProjects) => [...prevProjects, data.data.project]);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <h1>My projects</h1>
      <form className="add-project-form" onSubmit={handleSubmit}>
        <label htmlFor="titile">Title</label>
        <input
          name="title"
          className="title-input"
          placeholder="Life Cycle of Ants"
        />
        <label htmlFor="description">Description</label>
        <input
          name="description"
          className="description-input"
          placeholder="Project documenting the life of ants insects"
        />
        <label htmlFor="due-date">Due Date</label>
        <input name="due-date" type="date" />
        <button type="submit" className="add-btn">
          Add project
        </button>
      </form>
      <ul className="project-list">
        {projects.map((project) => (
          <li key={project.id}>
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <p>{project.dueDate}</p>
            <div>
              <button onClick={() => handleEditButtonClick(project)}>
                Edit project
              </button>
              <button onClick={() => handleDeleteProject(project)}>
                Delete project
              </button>
            </div>
          </li>
        ))}
      </ul>
      {error && <p>{error}</p>}
    </>
  );
}

export default App;
