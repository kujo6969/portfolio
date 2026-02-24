import { DraggableIcons } from "./components/DraggableIcons";
import { TechCard } from "./components/TechCard";

const TechStackPage = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full w-full">
      <div className="flex items-center justify-center">
        <DraggableIcons />
      </div>

      <div className="flex items-center justify-center">
        <TechCard />
      </div>
    </div>
  );
};

export default TechStackPage;
