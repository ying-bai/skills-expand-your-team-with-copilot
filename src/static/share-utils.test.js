const test = require("node:test");
const assert = require("node:assert/strict");

const {
  buildActivityShareUrl,
  getNextSharedActivityQuery,
  getSharedActivityFromUrl,
  matchesSharedActivity,
  prioritizeSharedActivity,
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

test("getNextSharedActivityQuery clears the shared state after a manual search change", () => {
  assert.equal(getNextSharedActivityQuery("Chess Club", "Chess Club"), "Chess Club");
  assert.equal(getNextSharedActivityQuery("Chess Club", "Chess"), "");
  assert.equal(getNextSharedActivityQuery("Chess Club", ""), "");
});

test("prioritizeSharedActivity adds the shared activity without dropping other results", () => {
  const filteredActivities = {
    "Art Club": { description: "Art" },
  };
  const allActivities = {
    "Chess Club": { description: "Chess" },
    "Art Club": { description: "Art" },
  };

  assert.deepEqual(
    prioritizeSharedActivity(filteredActivities, allActivities, "chess club"),
    {
      "Chess Club": { description: "Chess" },
      "Art Club": { description: "Art" },
    }
  );
});
