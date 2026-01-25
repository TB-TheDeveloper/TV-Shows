export const baseURL = "https://api.tvmaze.com";

export const stripTags = (html: string | null): string => {
  if (!html) return "";

  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
};
