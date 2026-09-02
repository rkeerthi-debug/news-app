import type { News } from "../types/news";
import { newsData } from "../mocks/newsData";

export interface NewsResponse {
  data: News[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export const getNews = async (
  page: number = 1,
  limit: number = 20
): Promise<NewsResponse> => {
  // Simulate API delay
  await new Promise((resolve) =>
    setTimeout(resolve, 500)
  );

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const data = newsData.slice(
    startIndex,
    endIndex
  );

  return {
    data,
    page,
    limit,
    total: newsData.length,
    totalPages: Math.ceil(
      newsData.length / limit
    ),
  };
};

export const getNewsById = async (
  id: number
): Promise<News | undefined> => {
  // Simulate API delay
  await new Promise((resolve) =>
    setTimeout(resolve, 300)
  );

  return newsData.find(
    (news) => news.id === id
  );
};