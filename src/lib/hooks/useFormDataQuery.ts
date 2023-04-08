import { useQuery } from "@tanstack/react-query";
import { getFormList } from "@/api/talent";

const useFormDataQuery = () => {
  const { data: formData, isError: formDataError } = useQuery({
    queryKey: ["form"],
    queryFn: getFormList,
  });

  return { formData, formDataError };
};
export default useFormDataQuery;
