import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getNewsById } from "../../services/newsApi";
import type { News } from "../../types/news";
import "./NewsDetail.css";

function NewsDetail() {
  const { id } = useParams();

  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadNews = async () => {
      if (!id) {
        setError("Invalid news ID.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const response = await getNewsById(Number(id));

        setNews(response ?? null);
      } catch {
        setError("Unable to load this article. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <main className="news-detail">
        <p>Loading article...</p>
      </main>
    );
  }

  // API error state
  if (error) {
    return (
      <main className="news-detail">
        <Link
          className="news-detail__back"
          to="/news"
        >
          ← Back to News
        </Link>

        <div className="news-detail__not-found">
          <h1>Something went wrong</h1>

          <p>{error}</p>

          <Link to="/news">
            Return to News
          </Link>
        </div>
      </main>
    );
  }

  // Article not found
  if (!news) {
    return (
      <main className="news-detail">
        <Link
          className="news-detail__back"
          to="/news"
        >
          ← Back to News
        </Link>

        <div className="news-detail__not-found">
          <h1>News Not Found</h1>

          <p>
            The article you're looking for doesn't exist.
          </p>

          <Link to="/news">
            Return to News
          </Link>
        </div>
      </main>
    );
  }

  // Successful article response
  return (
    <main className="news-detail">
      <Link
        className="news-detail__back"
        to="/news"
      >
        ← Back to News
      </Link>

      <article className="news-detail__article">
        <span className="news-detail__category">
          {news.category}
        </span>

        <h1 className="news-detail__title">
          {news.title}
        </h1>

        <p className="news-detail__description">
          {news.description}
        </p>

        <div className="news-detail__meta">
          <span>By {news.author}</span>
          <span>·</span>
          <span>{news.publishedAt}</span>
        </div>

        {news.image ? (
          <img
            className="news-detail__image"
            src={news.image}
            alt={news.title}
          />
        ) : (
          <div
            className="news-detail__image-placeholder"
            role="img"
            aria-label="No image available"
          >
            <span>No image available</span>
          </div>
        )}

        <div className="news-detail__content">
          <p>{news.content}</p>
        </div>
      </article>
    </main>
  );
}

export default NewsDetail;