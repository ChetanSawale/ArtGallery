const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fetch = require("node-fetch"); // Use v2 for CommonJS

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());

// 🔍 Debug log
console.log("🧪 Loaded PEXELS_KEY:", process.env.PEXELS_KEY ? "✅" : "❌ MISSING");
console.log("🧪 Loaded PIXABAY_KEY:", process.env.PIXABAY_KEY ? "✅" : "❌ MISSING");

// ===== PEXELS API =====
app.get("/api/pexels", async (req, res) => {
  const query = req.query.query || "art";

  if (!process.env.PEXELS_KEY) {
    return res.status(500).json({ error: "Missing PEXELS_KEY in backend" });
  }

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=12`,
      {
        headers: {
          Authorization: process.env.PEXELS_KEY,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Pexels API error: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("❌ Error fetching from Pexels:", err.message);
    res.status(500).json({ error: "Failed to fetch from Pexels" });
  }
});

// ===== PIXABAY API =====
app.get("/api/pixabay", async (req, res) => {
  const query = req.query.query || "art";

  if (!process.env.PIXABAY_KEY) {
    return res.status(500).json({ error: "Missing PIXABAY_KEY in backend" });
  }

  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${process.env.PIXABAY_KEY}&q=${encodeURIComponent(query)}&image_type=photo&per_page=12`
    );

    if (!response.ok) {
      throw new Error(`Pixabay API error: ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("❌ Error fetching from Pixabay:", err.message);
    res.status(500).json({ error: "Failed to fetch from Pixabay" });
  }
});

// ===== Start Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running at http://localhost:${PORT}`)
);
