import { useMutation, useQuery, useQueryClient } from "react-query";
import { supabase, useUser } from "../supabase";

export const useUploadFile = () => {
  const { data: user } = useUser();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (file: File) => {
      if (!file) return;
      const res = await supabase.storage
        .from(`files/${user?.user?.id}`)
        .upload(file.name, file);

      if (res.error) {
        window.alert(res.error.message);
        console.log(res.error);
      }

      console.log(res);
    },
    mutationKey: "uploadFile",
    onSuccess: () => {
      queryClient.invalidateQueries("files");
    },
  });

  return mutation;
};

export const useFiles = () => {
  const { data: user } = useUser();
  const query = useQuery({
    queryKey: "files",
    queryFn: () => supabase.storage.from(`files`).list(user?.user?.id),
  });

  return query;
};
