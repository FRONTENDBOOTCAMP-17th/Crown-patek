import { upload } from "../../../../shareApi/index.js";

export async function uploadImages(files) {
  const urls = [];
  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    const result = await upload("/admin/images", formData);
    urls.push(result.data.imageUrl);
  }
  return urls;
}
