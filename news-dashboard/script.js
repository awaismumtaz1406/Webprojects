const API_KEY = "cc84b1680df04ab783e3cf1c1b77dec6";
const BASE_URL = "https://newsapi.org/v2/everything";

const newsSection = document.getElementById("newsSection");

document.getElementById("searchForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const query = document.getElementById("queryInput").value;
  getNews(query);
});

async function getNews(query) {
  newsSection.innerHTML = "<div class='loading'>Loading news...</div>";
  try {
    const res = await fetch(`${BASE_URL}?q=${encodeURIComponent(query)}&apiKey=${API_KEY}`);
    if (!res.ok) throw new Error("Failed to fetch news");
    const data = await res.json();
    if (data.articles.length === 0) {
      newsSection.innerHTML = "<p class='error'>No news found for this topic.</p>";
      return;
    }
    displayNews(data.articles);
  } catch (err) {
    newsSection.innerHTML = `<p class='error'>${err.message}</p>`;
  }
}

function displayNews(articles) {
  newsSection.innerHTML = `
    <div class="news-grid">
      ${articles.map(article => `
        <div class="article">
          ${article.urlToImage ? `<img src="${article.urlToImage}" alt="news image" />` : ""}
          <h3>${article.title}</h3>
          <p>${article.description ? article.description : "No description available."}</p>
          <a href="${article.url}" target="_blank">Read More →</a>
        </div>
      `).join("")}
    </div>
  `;
}
