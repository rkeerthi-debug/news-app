import { Link } from "react-router-dom";
import type { News } from "../types/news";

interface NewsCardProps {
  news: News;
}

function NewsCard({ news }: NewsCardProps) {
  return (
    <article
      className="news-card"
      data-testid="news-card"
    >
      {/* Full-card navigation */}
      <Link
        to={`/news/${news.id}`}
        className="news-card__overlay-link"
        aria-label={`Read ${news.title}`}
      />

      <div className="news-card__image-container">
        {news.image ? (
          <img
            className="news-card__image"
            src={news.image}
            alt=""
          />
        ) : (
          <div className="news-card__image-placeholder">
            <span>No image</span>
          </div>
        )}
      </div>

      <div className="news-card__content">
        <span className="news-card__category">
          {news.category}
        </span>

        <h2 className="news-card__title">
          {news.title}
        </h2>

        <p className="news-card__description">
          {news.description}
        </p>

        <p className="news-card__meta">
          By {news.author} · {news.publishedAt}
        </p>

        <span className="news-card__read-more">
          Read article →
        </span>
      </div>
    </article>
  );
}

export default NewsCard;