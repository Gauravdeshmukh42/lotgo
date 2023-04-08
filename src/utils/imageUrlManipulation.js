import { API_URL_DEV } from "@env";
export const getFormatedImageUrl = (abstract) => {
  const images = abstract?.split("/uploads/");
  const regex = /([/|.|\w|\s])*\.(?:jpg|gif|png)/;
  const url = regex.exec(images[1]);
  const imageUrl = url && url[0] ? `${API_URL_DEV}/${url[0]}` : "";
  return imageUrl;
};

export const getAbstractWithoutImage = (abstract) => {
  const abstractData = abstract.replace(/!\[[[a-zA-Z.]+\]\(.*?\)\s*/, "");
  return abstractData;
};
