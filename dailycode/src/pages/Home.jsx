import "./Home.css";

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
    </main>
  );
}

export default Home;
