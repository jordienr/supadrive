import Image from "next/image";
import { Inter } from "next/font/google";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFiles, useUploadFile } from "@/lib/queries/files";
import { usePageConfig } from "@/lib/hooks";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const uploadFile = useUploadFile();
  const { data: files, isLoading, isError } = useFiles();

  return (
    <main className={`${inter.className}`}>
      supadrive
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        files?.data?.map((file) => <div key={file.id}>{file.name}</div>)
      )}
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const formData = new FormData(e.target as HTMLFormElement);
          const file = formData.get("file");

          if (!file) return;

          console.log(file);

          if (file instanceof File) {
            uploadFile.mutate(file);
          }
        }}
      >
        <Input name="file" type="file" />
        <Button>Upload</Button>
      </form>
    </main>
  );
}
