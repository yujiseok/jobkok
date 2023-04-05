import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { addComment, getDetailInfo } from "@/api/talentDetail";
import { ReactComponent as Edit } from "@/assets/svg/edit-icon.svg";

type FormValues = {
  evaluation: string;
};

const EvaluationNote = ({ id }: { id: string }) => {
  const { register, watch, handleSubmit } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const res = await addComment(id, data.evaluation);
    console.log(res);
  };
  const { data: talentInfo } = useQuery({
    queryKey: ["talentInfo"],
    queryFn: () => getDetailInfo(id),
    suspense: true,
  });
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="feedback-note flex-1 rounded-md border-2 border-gray-50 bg-white px-5 py-4"
    >
      <div className="flex items-center justify-between">
        <p className="SubHead1Semibold">평가노트</p>
        <button>
          <Edit />
        </button>
      </div>
      <p className="SubHead2Medium my-3 text-gray-400">
        인재의 전반적인 평가와 인상을 작성해보세요
      </p>

      <textarea
        defaultValue={
          talentInfo?.evaluation ? talentInfo?.evaluation : "입력해 주세요"
        }
        className="Caption1Medium textarea-bordered textarea textarea-lg min-h-[120px] w-full resize-none"
        maxLength={MAX_LENGTH}
        {...register("evaluation")}
      ></textarea>

      <div className="Caption1Medium text-gray-300">
        <span>{watch().evaluation?.length.toLocaleString()}</span>
        <span>/{MAX_LENGTH.toLocaleString()}자</span>
      </div>
    </form>
  );
};
export default EvaluationNote;

const MAX_LENGTH = 1000;
