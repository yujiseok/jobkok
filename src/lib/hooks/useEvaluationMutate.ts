import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addComment } from "@/api/talentDetail";

const useEvaluationMutate = () => {
  const queryClient = useQueryClient();
  const { mutate: setEvaluationMutate } = useMutation(
    (variable: { id: string; evaluation: string }) =>
      addComment(variable.id, variable.evaluation),
  );
  return { setEvaluationMutate };
};

export default useEvaluationMutate;
