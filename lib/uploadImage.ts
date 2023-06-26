import { ID, storage } from "@/appwrite";

export const uploadImage = async (file: File) => {
  if (!file) return;

  const fileUploaded = await storage.createFile(
    "648c525dc6d3956a0139",
    ID.unique(),
    file
  );

  return fileUploaded;
};
