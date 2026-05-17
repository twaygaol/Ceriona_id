import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const f = createUploadthing();

const auth = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error("Unauthorized");
  return { userId: session.user.id };
};

export const ourFileRouter = {
  // Upload gambar galeri
  galleryImage: f({ image: { maxFileSize: "4MB", maxFileCount: 50 } })
    .middleware(async () => await auth())
    .onUploadComplete(async ({ metadata, file }) => {
      return { uploadedBy: metadata.userId, url: file.ufsUrl };
    }),
  
  // Upload musik
  music: f({ audio: { maxFileSize: "16MB", maxFileCount: 1 } })
    .middleware(async () => await auth())
    .onUploadComplete(async ({ file }) => {
      return { url: file.ufsUrl };
    }),
  
  // Upload thumbnail template
  thumbnail: f({ image: { maxFileSize: "2MB", maxFileCount: 1 } })
    .middleware(async () => await auth())
    .onUploadComplete(async ({ file }) => {
      return { url: file.ufsUrl };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
