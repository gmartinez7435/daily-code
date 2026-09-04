import { useEffect, useState } from "react";
import projects from "../data/projects";
import "./Home.css";

const currentDay = new Date().getDay();

const days = [
  { name: "Sun" },
  { name: "Mon" },
  { name: "Tue" },
  { name: "Wed" },
  { name: "Thu" },
  { name: "Fri" },
  { name: "Sat" },
];

const completedProjects = 14;
const totalProjects = 20;

const progressPercent = (completedProjects / totalProjects) * 100;

function Home() {
  const [completedProjectIds, setCompletedProjectIds] = useState(() => {
    const savedProjects = localStorage.getItem("completedProjectIds");

    return savedProjects ? JSON.parse(savedProjects) : [];
  });

  const todaysProject = projects.find(
    (project) => !completedProjectIds.includes(project.id),
  );

  useEffect(() => {
    localStorage.setItem(
      "completedProjectIds",
      JSON.stringify(completedProjectIds),
    );
  }, [completedProjectIds]);

  return (
    <main className="home">
      <header className="home-header">
        <h1>
          Code<span className="daily">Daily</span>
        </h1>
      </header>
      <div className="home-greeting">
        <p>Good Morning,</p>
        <h2>Gabriel! 👋🏼</h2>
      </div>
      <div className="project-card">
        <div className="project-head">
          <p>TODAYS PROJECT</p>
          <span>DAY {todaysProject.id}</span>
        </div>
        <h3 className="project-title">{todaysProject.title}</h3>
        <p className="project-description">{todaysProject.description}</p>
        <span className="project-focus">JavaScript</span>
        <p className="project-skills">Focus: {todaysProject.skills}</p>
        <button className="start-btn">Start Coding</button>
      </div>
      <section className="week-progress">
        <h3>THIS WEEK</h3>
        <div className="week-days">
          {days.map((day, index) => (
            <div key={day.name}>
              <p>{day.name}</p>
              {index === currentDay ? "🔥" : "⭕️"}
            </div>
          ))}
        </div>
      </section>
      <section className="progress-card">
        <div className="pro-card-head">
          <h3>Progress</h3>
          <span>
            {completedProjects}/{totalProjects}
          </span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <p>Projects completed this month</p>
      </section>
    </main>
  );
}

export default Home;
