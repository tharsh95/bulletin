import React, { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import BulletinCard from "../../components/BulletinCard";
import Link from "next/link";
import moment from "moment";
import { LogOut } from "lucide-react";
import { useRouter } from "next/router";
const Dashboard = () => {
  const [bulletin, setBulletin] = useState([]);
const router = useRouter()
  useEffect(() => {
    const fetchBulletin = async () => {
      try {
        const response = await fetch("api/bulletin/list");
        if (response.ok) {
          const data = await response.json();

          setBulletin(data.bulletinList);
        } else {
          console.error("Failed to fetch bulletin data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching bulletin data:", error);
      }
    };

    fetchBulletin();
  }, []);
const handleLogout=async(e)=>{
  e.preventDefault()
  await fetch('/api/auth/logout')
  router.push('/login')
}
  return (
    <>
      <div className="bg-[#10253E] h-screen p-8">
        <div className="border-2 border-gray-500 h-full rounded-xl overflow-hidden">
          <div className="flex flex-col items-center  h-full">
            <div className="flex items-center justify-between p-4 lg:w-[50%] sm:w-[85%] w-[85%]">
              <h1 className="font-bold text-white text-3xl">Bulletin </h1>
              <Link href={"/dashboard/create"}>
                <Button variant="destructive">Add new Bulletin</Button>
              </Link>
              <form onSubmit={handleLogout}>
                <Button variant="destructive">
                  <LogOut />
                </Button>
              </form>
            </div>
            <div className="overflow-y-auto mb-4`">
              {bulletin?.map((el) => (
                <div key={el.id} className="m-8">
                  <BulletinCard
                    id={el.id}
                    title={el.title}
                    description={el.description}
                    date={moment(el.createdAt).format("LLL")}
                    name={el.login.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
