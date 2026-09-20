(function (global) {
  function normalizeActivityName(activityName) {
    return activityName.trim().toLowerCase();
  }

  function getSharedActivityFromUrl(url) {
    const parsedUrl = new URL(url);
    const activity = parsedUrl.searchParams.get("activity");
    return activity ? activity.trim() : "";
  }

  function buildActivityShareUrl(currentUrl, activityName) {
    const shareUrl = new URL(currentUrl);
    shareUrl.searchParams.set("activity", activityName);
    return shareUrl.toString();
  }

  function matchesSharedActivity(activityName, sharedActivityQuery) {
    if (!sharedActivityQuery) {
      return false;
    }

    return (
      normalizeActivityName(activityName) ===
      normalizeActivityName(sharedActivityQuery)
    );
  }

  function getNextSharedActivityQuery(currentSharedActivity, nextSearchQuery) {
    if (!currentSharedActivity || !nextSearchQuery) {
      return "";
    }

    return matchesSharedActivity(currentSharedActivity, nextSearchQuery)
      ? currentSharedActivity
      : "";
  }

  const shareUtils = {
    normalizeActivityName,
    getSharedActivityFromUrl,
    buildActivityShareUrl,
    getNextSharedActivityQuery,
    matchesSharedActivity,
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = shareUtils;
  }

  global.shareUtils = shareUtils;
})(typeof window !== "undefined" ? window : globalThis);
