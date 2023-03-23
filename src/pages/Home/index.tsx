import { ReactComponent as Test } from "@/svg/test.svg";
import Button from "@components/Common/Button";
const Home = () => {
  return (
    <div className="text-xl font-extrabold text-rose-300">
      Hello World
      <br />
      <Button />
      <div>
        <Test className="h-6 w-6" />
      </div>
    </div>
  );
};
export default Home;
