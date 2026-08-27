import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProjectHorizon from "./pages/ProjectHorizon";
import ProjectLakeWoods from "./pages/ProjectLakeWoods";

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null, info: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { this.setState({ error, info }); console.error("ErrorBoundary caught an error", error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{padding: "2rem", background: "red", color: "white", minHeight: "100vh"}}>
          <h2>Something went wrong.</h2>
          <pre style={{whiteSpace: "pre-wrap"}}>{this.state.error && this.state.error.toString()}</pre>
          <pre style={{whiteSpace: "pre-wrap"}}>{this.state.info && this.state.info.componentStack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/horizon" element={<ProjectHorizon />} />
          <Route path="/lake-woods" element={<ProjectLakeWoods />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
