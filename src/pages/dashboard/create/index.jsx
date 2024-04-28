import React from "react";
import CreateForm from "../../../components/CreateForm";

const Create = () => {
  return (
    <div className="bg-[#10253E] h-screen p-8">
      <div className="border-2 border-gray-500 h-full rounded-xl overflow-hidden">
        <div className="flex flex-col items-center justify-center  h-full">
          <div className="lg:w-[40rem] sm:w-[25rem] w-[25rem] h-[35rem] rounded-2xl bg-white">
            <CreateForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
