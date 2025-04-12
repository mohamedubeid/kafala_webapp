import React from "react";
import { Button, message, Modal } from "antd";
import { CopyOutlined } from "@ant-design/icons";

interface SubscriptionModalProps {
  isVisible: boolean;
  onClose: () => void;
  id: number | null;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isVisible,
  onClose,
  id,
}) => {
  // Styles for the title
  const titleStyle: React.CSSProperties = {
    fontWeight: "bold",
    color: "black",
    fontSize: "20px",
    marginBottom: "5px",
  };
  const copyToClipboard = () => {
    navigator.clipboard.writeText(String(id));
    message.success("تم نسخ رقم التحويل");
  };
  return (
    <Modal
      title={
        <div
          style={{
            fontWeight: "bold",
            fontSize: "24px",
            color: "black",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          بيانات التحويل
        </div>
      }
      visible={isVisible}
      footer={null}
      onCancel={onClose}
    >
      {/* Header Section */}
      <div className="modal-section">
        <h1 style={titleStyle}>بيانات حساب مؤسسة القدس ماليزيا</h1>
        <h3>Country: Malaysia</h3>
        <h3>Bank Name: Maybank</h3>
      </div>

      <div className="modal-section mt-4">
      <div className="flex flex-center gap-1">
        <h1 style={{ ...titleStyle, color: "#0B7275" }}>رقم التحويل</h1>
        <CopyOutlined
          onClick={copyToClipboard}
          style={{ fontSize: "18px", cursor: "pointer", color: "#0B7275" }}
        />
      </div>
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#0B7275",
          textAlign: "center",
          backgroundColor: "#f3f8f8",
          padding: "10px",
          borderRadius: "8px",
          border: "1px dashed #0B7275",
          direction: "ltr", 
        }}
      >
        {id}
      </h2>
      <p
      style={{
        marginTop: "8px",
        fontSize: "14px",
        color: "#555",
        textAlign: "center",
        fontWeight: 500,
      }}
  >
    الرجاء التأكد من إرفاق <span style={{ color: "#0B7275", fontWeight: "bold" }}>رقم التحويل</span> اثناء عملية التحويل.
  </p>
    </div>


      {/* Account Details Section */}
      <div className="modal-section mt-4">
        <h1 style={titleStyle}>Account Details</h1>
        <h3>Account Name: Yayasan Al-Quds Malaysia</h3>
        <h3>Account Number: 564221639339</h3>
        <h3>Swift Code: MBBEMYKL</h3>
      </div>

      {/* Organization Address Section */}
      <div className="modal-section mt-4">
        <h1 style={titleStyle}>عنوان المؤسسة</h1>
        <h3>2-35, PV128, Jalan Genting Kelang, Setapak, 53100, Kuala Lumpur</h3>
      </div>

      {/* Contact Details Section */}
      <div className="modal-section mt-4">
        <h1 style={titleStyle}>رقم الهاتف:</h1>
        <h3>0060341312650</h3>
      </div>

      {/* Bank Address Section */}
      <div className="modal-section mt-4">
        <h1 style={titleStyle}>عنوان البنك (الفرع):</h1>
        <h3>
          Wisma Ks, 5, Jalan Meranti, Taman Setapak, 53000 Kuala Lumpur, Wilayah
          Persekutuan Kuala Lumpur
        </h3>
      </div>

      {/* Bank Contact Section */}
      <div className="modal-section mt-4">
        <h1 style={titleStyle}>رقم هاتف البنك:</h1>
        <h3>00603-4022 2130</h3>
      </div>

      <div className="modal-section mt-6 flex justify-end">
        <Button
          onClick={onClose}
          className="h-[40px] w-[120px] rounded-full border border-solid border-kafalaPrimary bg-kafalaPrimary text-xl !text-white duration-300 hover:!border-kafalaPrimary-400 hover:!bg-kafalaPrimary-400"
        >
          إغلاق
        </Button>
      </div>
    </Modal>
  );
};

export default SubscriptionModal;
