import { Routes, Route, Navigate } from "react-router-dom";
import NewsList from "./pages/NewsList/NewsList";
import NewsDetail from "./pages/NewsDetails/NewsDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/news" replace />} />
      <Route path="/news" element={<NewsList />} />
      <Route path="/news/:id" element={<NewsDetail />} />
    </Routes>
  );
}

export default App;