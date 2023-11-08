import { useEffect, useState } from "react";
import image from "../assets/icons/close.png";
import api from "../utils/auth";

const Home = () => {
  const [data, setData] = useState();
  const [openModal, setModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState();
  useEffect(() => {
    api
      .get("/stories")
      .then((res) => {
        setData(res.data);
        console.log(res.data, " = Result");
      })
      .catch((err) => {
        console.log(err, " = Error");
      });
  }, []);

  const openNews = (news) => {
    setSelectedNews(news);
    setModal(true);
  };

  return (
    <>
      {!data ? (
        <div className="  flex items-center justify-center h-screen">
          <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-slate-700 h-10 w-10"></div>
              <div className="flex-1 space-y-6 py-1">
                <div className="h-2 bg-slate-700 rounded"></div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                    <div className="h-2 bg-slate-700 rounded  col-span-1"></div>
                  </div>
                  <div className="h-2 bg-slate-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col w-full">
            <div
              className={`${
                openModal === true ? "hidden" : "visible"
              } grid gap-5 p-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
            >
              {data &&
                data?.topStories.map((item, index) => (
                  <div
                    key={index}
                    className="border-[1px] shadow-xl shadow-[#d0d0d0] p-5 bg-[#f5f5f5] rounded-lg w-auto"
                  >
                    <p className="font-semibold py-3 text-[20px]">
                      {item.title}
                    </p>
                    <div style={{ maxHeight: "50vh", overflow: "hidden" }}>
                      <img
                        src={item?.multimedia && item.multimedia[0]?.url}
                        className="w-[100%] cursor-pointer"
                        onClick={() => openNews(item)}
                        alt={item?.title}
                      />
                    </div>
                  </div>
                ))}
            </div>

            <div
           
              className={`modal ${
                
                openModal ? "visible" : "hidden"
              } h-[90vh]   flex align-center`}
            >
              <div className="h-[70vh] max-w-[100%] w-[78%] m-auto flex flex-col md:flex-row  p-5 md:pr-8 overflow-hidden items-center gap-[10px] bg-white shadow-xl shadow-[#606060] border-2">
                <div className="flex h-[60vh]  flex-col  w-full md:w-[40vw]">
                  <img
                    src={selectedNews?.multimedia[0]?.url}
                    alt="cancel"
                    className="  w-full md:min-w-[35vw] cursor-pointer"
                    onClick={() => setModal(false)}
                  />
                  <p className="mt-3">{selectedNews?.abstract}</p>
                </div>
                <div className=" sm:p-6 md:p-0 xl:p-0  h-[60vh] rounded-none relative flex-col  pl-[15px]">
                  <img
                    src={image}
                    alt="cancel"
                    className="w-[30px] absolute right-[-15px] top-[-33px] cursor-pointer"
                    onClick={() => setModal(false)}
                  />
                  <h4 className="font-bold text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px]  xl:text-[32px]">
                    {selectedNews?.title}
                  </h4>
                  <p className="pt-4">{selectedNews?.byline}</p>
                  <p className="mt-4 text-[#454545]">
                    {selectedNews?.multimedia[0]?.caption}
                  </p>

                  <p className="text-[#505050] pl-2">
                    {selectedNews?.published_date}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
