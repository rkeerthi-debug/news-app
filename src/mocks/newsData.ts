import type { News } from "../types/news";

const categories = [
  "Technology",
  "Business",
  "Science",
  "Environment",
  "Sports",
];

const authors = [
  "Sarah Johnson",
  "Michael Brown",
  "Emily Davis",
  "David Wilson",
  "James Miller",
  "Olivia Taylor",
  "Daniel Anderson",
  "Sophia Martinez",
];

const titles = [
  "AI Technology Continues to Transform Modern Businesses",
  "Global Markets Show Strong Growth",
  "New Discoveries in Space Exploration",
  "The Future of Sustainable Energy",
  "Technology Trends to Watch This Year",
  "Digital Innovation Is Changing Everyday Life",
  "Businesses Continue to Invest in Cloud Technology",
  "Scientists Discover New Environmental Solutions",
  "Global Technology Industry Sees Major Growth",
  "New Research Reveals Important Scientific Findings",
];

const descriptions = [
  "Companies are increasingly adopting new technology to improve productivity and customer experiences.",
  "Global markets experienced positive movement today as investors responded to new economic developments.",
  "Scientists have announced new findings from recent research and exploration missions.",
  "Renewable energy adoption continues to increase around the world.",
  "Several technology trends are expected to influence businesses and consumers.",
];

const content = [
  "Technology continues to transform industries around the world. Organizations are adopting new digital solutions to improve efficiency, provide better customer experiences, and create new opportunities for growth.",

  "Recent developments have attracted significant attention from businesses and consumers. Experts believe these changes could have a long-term impact on the industry.",

  "Researchers and industry leaders are continuing to explore new opportunities. The latest findings provide valuable insights into how the future may develop.",
];

export const newsData: News[] = Array.from(
  { length: 200 },
  (_, index) => {
    const id = index + 1;

    return {
      id,

      title: `${titles[index % titles.length]} - ${id}`,

      description:
        descriptions[index % descriptions.length],

      content:
        content[index % content.length],

      category:
        categories[index % categories.length],

      author:
        authors[index % authors.length],

      publishedAt: "2026-09-01",

      // Every 5th article intentionally has no image
      image:
        id % 5 === 0
          ? undefined
          : `https://picsum.photos/seed/news-${id}/600/400`,
    };
  }
);