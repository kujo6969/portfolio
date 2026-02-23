import BasicInfo from "./components/BasicInfo";
import ThemeSelector from "./components/ThemeSelector";

const HelloPage = () => {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-background transition-colors duration-300 min-h-[80vh]">
      <div
        className="pointer-events-none absolute w-150 h-150 rounded-full blur-[120px]"
        style={{
          background:
            "linear-gradient(90deg, var(--blur-primary), var(--blur-secondary))",
          opacity: 0.5,
        }}
      />

      <div
        className="pointer-events-none absolute w-100 h-100 rounded-full blur-[160px]"
        style={{
          backgroundColor: "var(--blur-secondary)",
          opacity: 0.5,
        }}
      />
      <div className="flex flex-row items-start justify-center gap-12 md:gap-16">
        <BasicInfo />
        <div className="hidden md:block">
          <ThemeSelector />
        </div>
      </div>
    </div>
  );
};

export default HelloPage;
