import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { checkApplication } from "@/api/talentDetail";

const useConfirmDocsMutate = () => {
  const { id } = useParams() as { id: string };
  console.log(id);
  const queryClient = useQueryClient();
  const { mutate: confirmDocsMutate, data: mutateData } = useMutation(
    checkApplication,
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
  );
  return { confirmDocsMutate };
};
export default useConfirmDocsMutate;
