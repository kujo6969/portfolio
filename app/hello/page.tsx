import BasicInfo from "./components/BasicInfo";
import SnakeGame from "./components/Game";

const HelloPage = () => {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden">
      <div className="absolute w-200 h-200 bg-linear-to-r from-[#48B3AF] via-[#A7E399] to-[#F6FF99] rounded-full blur-[100px] opacity-20 " />

      <div className="absolute w-100 h-100 bg-blue-500 rounded-full blur-[150px] opacity-10" />

      <div className="grid grid-cols-2 gap-8">
        <BasicInfo />
        <SnakeGame />
      </div>
    </div>
  );
};

export default HelloPage;
