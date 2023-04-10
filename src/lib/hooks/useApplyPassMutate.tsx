import { useMutation, useQueryClient } from "@tanstack/react-query";
import { passTalent } from "@/api/talent";

const useApplyPassMutate = () => {
  const queryClient = useQueryClient();
  const { mutate: applyPassMutate, data: mutateData } = useMutation(
    passTalent,
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
  );
  return { applyPassMutate };
};
export default useApplyPassMutate;
