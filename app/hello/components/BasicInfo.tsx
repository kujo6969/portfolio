const BasicInfo = () => {
  return (
    <div className="flex flex-col gap-8 p-5">
      <p className="font-body text-sm">Hello, my name is</p>
      <h1 className="font-sub-body text-6xl">James Edward Ofianga</h1>
      <h1 className="font-header text-4xl text-[#F6FF99] pb-10">
        <span className="mr-5">{">"}</span> Full-Stack Developer
      </h1>
      <div className="flex flex-col gap-2 font-body">
        <p className="text-lg text-gray-500">
          <span className="mr-3">//</span> Welcome to my humble portfolio
        </p>
        <p className="text-lg text-gray-500">
          <span className="mr-3">//</span> Kindly explore my journey
        </p>
      </div>
    </div>
  );
};

export default BasicInfo;
