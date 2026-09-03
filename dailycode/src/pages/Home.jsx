import "./Home.css";

const days = [
  {
    name: "Mon",
    status: "done",
  },
  {
    name: "Tue",
    status: "done",
  },
  {
    name: "Wed",
    status: "current",
  },
  {
    name: "Thu",
    status: "pending",
  },
  {
    name: "Fri",
    status: "pending",
  },
  {
    name: "Sat",
    status: "pending",
  },
  {
    name: "Sun",
    status: "pending",
  },
];

function Home() {
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
          <span>DAY 1</span>
        </div>
        <h3 className="project-title">DOM List Filter</h3>
        <p className="project-description">
          Build a list that lets the user filter items with JavaScript.
        </p>
        <span className="project-focus">JavaScript</span>
        <p className="project-skills">Focus: Arrays · DOM · filter()</p>
        <button className="start-btn">Start Coding</button>
      </div>
      <section className="week-progress">
        <h3>THIS WEEK</h3>
        <div className="week-days">
          {days.map((day) => (
            <div key={day.name}>
              <p>{day.name}</p>
              {day.status === "done"
                ? "✅"
                : day.status === "current"
                  ? "🔥"
                  : "⭕️"}
            </div>
          ))}
        </div>
      </section>
      <section className="progress-card">
        <div className="pro-card-head">
          <h3>Progress</h3>
          <span>14/20</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
        <p>Projects completed this month</p>
      </section>
    </main>
  );
}

export default Home;
