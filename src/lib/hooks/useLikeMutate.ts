import { useMutation, useQueryClient } from "@tanstack/react-query";
import { assortLikeTalent } from "@/api/talentDetail";

const useLikeMutate = () => {
  const queryClient = useQueryClient();
  const { mutate: likeMutate, data: mutateData } = useMutation(
    assortLikeTalent,
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
  );

  return { likeMutate };
};
export default useLikeMutate;
