import { useQuery } from "@tanstack/react-query";
import { getFormList } from "@/api/talent";

const useSelectForm = () => {
  const { data: formData } = useQuery({
    queryKey: ["form"],
    queryFn: () => getFormList("false"),
    suspense: true,
    refetchOnWindowFocus: false,
  });
  return formData;
};
export default useSelectForm;
