const test = require("node:test");
const assert = require("node:assert/strict");

const {
  buildActivityShareUrl,
  getSharedActivityFromUrl,
  matchesSharedActivity,
} = require("./share-utils");

test("getSharedActivityFromUrl returns a decoded activity name", () => {
  assert.equal(
    getSharedActivityFromUrl("https://example.com/static/index.html?activity=Chess%20Club"),
    "Chess Club"
  );
});

test("buildActivityShareUrl preserves the current route state", () => {
  assert.equal(
    buildActivityShareUrl(
      "https://example.com/static/index.html?category=arts#top",
      "Drama Club"
    ),
    "https://example.com/static/index.html?category=arts&activity=Drama+Club#top"
  );
});

test("matchesSharedActivity compares normalized activity names", () => {
  assert.equal(matchesSharedActivity("Chess Club", " chess club "), true);
  assert.equal(matchesSharedActivity("Chess Club", "Drama Club"), false);
});
