import "bootstrap/dist/css/bootstrap.min.css";
import { createClient } from "pexels";
import { useEffect, useState } from "react";
import "./MasonryGrid.css";

export default function MasonryGrid() {
  const client = createClient(import.meta.env.VITE_API_KEY);

  const [images, setImages] = useState([]);
  const [query, setQuery] = useState(null);
  const [queryCount, setQueryCount] = useState(20);
  const [quality, setQuality] = useState("medium");

  useEffect(() => {
    if (query)
      client.photos
        .search({ query: query, page: 1, per_page: queryCount })
        .then((res) => setImages(res.photos))
        .catch((e) => console.error(e));
  }, [query, queryCount]);

  const openImageInPopup = (url) => {
    window.open(url, "ImagePopup", "width=800,height=600,scrollbars=yes");
  };

  return (
    <main className="container vh-100">
      <div className="card h-100">
        <div className="card-header">
          <form
            className="row align-items-center gap-2"
            action="submit"
            onSubmit={(e) => {
              e.preventDefault();
              setQuery(e.target["query"].value);
              setQueryCount(e.target["queryCount"].value);
            }}
          >
            <div className="col d-flex flex-column">
              <label className="form-label" htmlFor="query">
                Search for images
              </label>
              <input
                className="form-control "
                type="search"
                name="query"
                id="query"
                required
              />
            </div>
            <div className="col d-flex flex-column">
              <label className="form-label w-25" htmlFor="queryCount">
                No of Images
              </label>
              <input
                className="form-range"
                type="range"
                min={10}
                max={50}
                step={1}
                defaultValue={queryCount}
                name="queryCount"
                id="queryCount"
                onChange={(e) => {
                  document.getElementById("queryCountValue").innerHTML =
                    e.target.value;
                }}
              />
              <span id="queryCountValue">{queryCount}</span>
            </div>
            <select
              name="quality"
              id="quality"
              className="form-select col d-flex flex-column"
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
            >
              <option value="original">Original</option>
              <option value="large2x">Large 2x</option>
              <option value="large">Large</option>
              <option value="medium">Medium</option>
              <option value="small">Small</option>
              <option value="portrait">Portrait</option>
              <option value="landscape">Landscape</option>
              <option value="tiny">Tiny</option>
            </select>

            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </form>
        </div>
        <div className="card-body h-100 overflow-y-auto">
          <div className="list">
            {images.length > 0 &&
              images.map((img) => (
                <div
                  key={img.id}
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    openImageInPopup(img.src.original);
                  }}
                >
                  <img alt={img.alt} src={img.src[quality]} loading="lazy" />
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
