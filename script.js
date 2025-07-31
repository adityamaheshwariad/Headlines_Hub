async function fetchNews() {
  const apiKey = "92755bd55cd1f494f8936a2b6a443bc5"; // Your GNews API key
  const url = `https://gnews.io/api/v4/top-headlines?lang=en&token=${apiKey}`;

  const newsContainer = document.getElementById("newsContainer");
  newsContainer.innerHTML = "<p>Searching....</p>";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.articles || data.articles.length === 0) {
      newsContainer.innerHTML = "<p>No news found.</p>";
      return;
    }

    newsContainer.innerHTML = ""; // Clear previous content

    data.articles.forEach(article => {
      const newsItem = document.createElement("div");
      newsItem.className = "news-item";

      newsItem.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.description || "No description available."}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      `;

      newsContainer.appendChild(newsItem);
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    newsContainer.innerHTML = `<p style="color:red;">Failed to load news.</p>`;
  }
}
