// D:\IMS\client\src\components\ProjectSelect.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProjectSelect.css';

function ProjectSelect() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');

  useEffect(() => {
    axios.get('/api/projects')
      .then(response => setProjects(response.data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  const handleProjectChange = (event) => {
    setSelectedProject(event.target.value);
  };

  return (
    <div className="project-select">
      <label htmlFor="project">Select Project:</label>
      <select id="project" value={selectedProject} onChange={handleProjectChange}>
        <option value="">Select a project</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ProjectSelect;
