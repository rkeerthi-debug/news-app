import { useEffect, useState } from "react";
import { getNews } from "../../services/newsApi";
import type { News } from "../../types/news";
import NewsCard from "../../components/NewsCard/NewsCard";
import Pagination from "../../components/Pagination/pagination";
import { ITEMS_PER_PAGE } from "../../constants/pagination";
import "./NewsList.css";

function NewsList() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getNews(
          currentPage,
          ITEMS_PER_PAGE
        );

        setNews(response.data);
        setTotalPages(response.totalPages);
        setTotalItems(response.total);
      } catch {
        setError(
          "Unable to load news. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  /*
   * Loading state
   */
  if (loading) {
    return (
      <main className="news-page">
        <header className="news-page__header">
          <h1 className="news-page__title">
            Latest News
          </h1>
        </header>

        <div className="news-list-wrapper">
          <div className="news-state">
            <p>Loading news...</p>
          </div>
        </div>
      </main>
    );
  }

  /*
   * Error state
   */
  if (error) {
    return (
      <main className="news-page">
        <header className="news-page__header">
          <h1 className="news-page__title">
            Latest News
          </h1>
        </header>

        <div className="news-list-wrapper">
          <div className="news-state">
            <h2>Something went wrong</h2>

            <p>{error}</p>

            <button
              type="button"
              className="news-state__button"
              onClick={() => window.location.reload()}
            >
              Try again
            </button>
          </div>
        </div>
      </main>
    );
  }

  /*
   * Empty state
   */
  if (news.length === 0) {
    return (
      <main className="news-page">
        <header className="news-page__header">
          <h1 className="news-page__title">
            Latest News
          </h1>
        </header>

        <div className="news-list-wrapper">
          <div className="news-state">
            <h2>No news available</h2>

            <p>
              There are no news articles available right now.
            </p>
          </div>
        </div>
      </main>
    );
  }

  /*
   * Main news page
   */
  return (
    <main className="news-page">

    {/*  FIXED HEADER */}  
      <header className="news-page__header">
        <h1 className="news-page__title">
          Latest News
        </h1>
      </header>

{/*scroll only middle section*/}
      <div className="news-list-wrapper">
        <section
          className="news-list"
          aria-label="Latest news articles"
        >
          {news.map((item) => (
            <NewsCard
              key={item.id}
              news={item}
            />
          ))}
        </section>
      </div>


      { /*fixed pafination footer */ }
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        onPageChange={handlePageChange}
      />

    </main>
  );
}

export default NewsList;