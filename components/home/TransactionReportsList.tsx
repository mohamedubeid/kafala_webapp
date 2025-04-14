import useGetTransactionReports from "@/hooks/children/getTransactionReports";
import { ChildTransactionReportDTO } from "@/types/childTransactionReport";
import { Modal, Button, Pagination } from "antd";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "next-i18next";
import { ITEMS_PER_PAGE } from "@/constants/pagination";

const TransactionReportsList = () => {
  const { i18n, t: translate } = useTranslation();
  const [size, setSize] = useState<number>(20);
  const [page, setPage] = useState<number>(1);

  const { data:Transactions } = useGetTransactionReports(size, page);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);

  const showModal = (videoUrl: string) => {
    setCurrentVideo(videoUrl);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentVideo(null);
  };

  return (
    <div className="kids-list-page my-8 min-h-screen">
      <div className="container">
        <div className="text-4xl font-semibold mt-16">
          {translate("home:CHILDREN_TRANSACTIONS")}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {Transactions?.data?.map((transaction) => (
            <Link
              key={transaction.id}
              href={`/children/profile/${transaction.child.id}`}
              passHref
              className="h-fit"
            >
              <div
                className="bg-kafalaPrimary-200 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              >
                <img
                  src={transaction.image || "/assets/partial/kid-img.png"}
                  alt="Transaction Image"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-[#212121]">
                    {`${transaction.child.firstName} ${transaction.child.fatherName} ${transaction.child.familyName}`}
                  </h3>
                  <p className="text-sm text-[#737373]">
                    {new Date(transaction.createdDate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-[#737373] mt-2">
                    {translate("children:amountReceived")}:{" "}
                    <span className="font-semibold text-[#212121]">
                      {transaction.amount_received} {translate("children:currency")}
                    </span>
                  </p>
                  <p className="text-sm text-[#737373] mt-2">
                    {translate("children:description")}:{" "}
                    <span className="font-normal text-[#212121]">
                      {transaction.desceription}
                    </span>
                  </p>
                  {transaction.video && (
                    <Button
                      type="primary"
                      className="mt-7 h-[50px] w-[200px] rounded-full border border-solid border-kafalaPrimary bg-kafalaPrimary-400 text-xl !text-white duration-300 hover:!border-kafalaPrimary-300 hover:!bg-kafalaPrimary-300 max-lg:!mx-auto max-lg:block lg:w-full"
                      onClick={(e) => {
                        e.preventDefault();
                        showModal(transaction.video);
                      }}
                    >
                      {translate("children:SHOW_VIDEO")}
                    </Button>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="data-pagination">
        <Pagination
          pageSize={size}
          current={page}
          total={Transactions?.count}
          defaultCurrent={1}
          responsive
          showLessItems
          showTitle={false}
          showSizeChanger={false}
          onChange={(page) => {
            setPage(page);
          }}
        />
      </div>
      <Modal
        title={translate("children:SHOW_VIDEO")}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        centered
      >
        {currentVideo && (
          <video
            controls
            autoPlay
            className="w-full h-auto rounded-lg"
            src={currentVideo}
          >
            Your browser does not support the video tag.
          </video>
        )}
      </Modal>
    </div>
  );
};

export default TransactionReportsList;