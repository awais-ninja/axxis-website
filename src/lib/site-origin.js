const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1"]);

export function parseProductionOrigin(value) {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  let url;
  try {
    url = new URL(trimmed);
  } catch {
    return null;
  }

  if (url.protocol !== "https:") {
    return null;
  }
  if (url.username || url.password || url.search || url.hash || url.port) {
    return null;
  }
  if (url.pathname !== "/") {
    return null;
  }

  const hostname = url.hostname.toLowerCase();
  if (
    LOCAL_HOSTS.has(hostname) ||
    hostname.endsWith(".localhost") ||
    hostname.endsWith(".local") ||
    !hostname.includes(".") ||
    hostname.endsWith(".internal") ||
    hostname.startsWith(".") ||
    hostname.endsWith(".") ||
    hostname.includes("..") ||
    hostname.includes(":") ||
    /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)
  ) {
    return null;
  }

  return url.origin;
}

export function readSiteOrigin(env = process.env) {
  return parseProductionOrigin(env.NEXT_PUBLIC_SITE_URL);
}

export function isVerifiedProductionDeployment(env = process.env) {
  return env.AXXIS_VERIFIED_PRODUCTION === "true";
}

export function isSearchIndexingEnabled(env = process.env) {
  return (
    isVerifiedProductionDeployment(env) &&
    env.NEXT_PUBLIC_ALLOW_INDEXING === "true" &&
    readSiteOrigin(env) !== null
  );
}
