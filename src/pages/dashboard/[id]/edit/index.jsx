import React, { useEffect, useState } from "react";
import EditForm from "../../../../components/EditForm";
import { useRouter } from 'next/router'

const Edit = () => {
  const [bulletin,setBulletin]=useState({})
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    const fetchBulletin = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/bulletin/getone?id=${id}`);
        if (response.ok) {
          const data = await response.json();
          setBulletin(data.bulletin);
        } else {
          console.error("Failed to fetch bulletin data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching bulletin data:", error);
      }
    };

    fetchBulletin();
  }, [id]);

  return (
    <div className="bg-[#161616] h-screen p-8">
      <div className="border-2 border-black h-full rounded-xl overflow-hidden">
        <div className="flex flex-col items-center justify-center  h-full">
          <div className="w-[40rem] h-[80rem] rounded-2xl bg-white">
            <EditForm bulletin={bulletin}/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Edit;
