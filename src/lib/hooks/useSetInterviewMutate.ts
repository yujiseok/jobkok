import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setMeeting } from "@/api/talentDetail";

const useSetInterviewMutate = () => {
  const queryClient = useQueryClient();
  const { mutate: setInterviewMutate } = useMutation(
    (variables: { id: string; interviewDate: string; interviewTime: string }) =>
      setMeeting(
        variables.id,
        variables.interviewDate,
        variables.interviewTime,
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
  );
  return { setInterviewMutate };
};
export default useSetInterviewMutate;
