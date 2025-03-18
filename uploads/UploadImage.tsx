import React, { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Modal, Upload, UploadFile, UploadProps } from "antd";
import { RcFile } from "antd/lib/upload";
import getPreSignedUrl from "@/pages/api/media/getPreSignedUrl";

type Props = {
  id?: string;
  setImageUrl: (url?: string) => void;
  multiple?: boolean;
  title: string;
  acceptTypes: string;
  removeImage?: (imageIndex?: number) => void | undefined;
  maxLength?: number;
  viewType?: string;
  isSuccess?: boolean;
  uploadImageCallback?: () => void;
  uploadingStatus?: (status?: string) => void;
  defaultImages?: UploadFile[];
  label?: string;
};

function UploadImage({
  id,
  setImageUrl,
  multiple,
  title,
  acceptTypes,
  removeImage,
  maxLength,
  viewType,
  isSuccess,
  uploadImageCallback,
  uploadingStatus,
  defaultImages = [],
  label,
}: Props) {
  const [headers, setHeaders] = useState<any>();
  const [fileList, setFileList] = useState<UploadFile[]>(defaultImages);
  const [error, setError] = useState<boolean>(false);

  // States for handling preview
  const [previewMedia, setPreviewMedia] = useState<string>();
  const [isPreviewVisible, setPreviewVisible] = useState<boolean>(false);
  const [isVideo, setIsVideo] = useState<boolean>(false);

  useEffect(() => {
    if (isSuccess) {
      setFileList([]);
    }
  }, [isSuccess]);

  useEffect(() => {
    setFileList(defaultImages);
  }, [defaultImages]);

  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    let isVideoFile = false;
    if (file.type) {
      isVideoFile = file.type.startsWith("video");
    } else if (file.url) {
      const fileExtension = file.url.split(".").pop();
      isVideoFile =
        fileExtension === "mp4" ||
        fileExtension === "webm" ||
        fileExtension === "ogg";
    }

    setIsVideo(isVideoFile);
    setPreviewMedia(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleCancel = () => setPreviewVisible(false);

  const uploadImage = async (options: any) => {
    const { onSuccess, onError, file, onProgress } = options;
    const preSignedUrl = await getPreSignedUrl(file.name);

    uploadImageCallback?.();

    const xhr = new XMLHttpRequest();
    xhr.open("PUT", preSignedUrl);
    xhr.upload.onprogress = (event: any) => {
      onProgress({ percent: (event.loaded / event.total) * 100 }, file);
    };
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          onSuccess(null, file);
          setImageUrl(xhr.responseURL.split("?")[0]);
        } else {
          onError(xhr.responseText, xhr.response, file);
        }
      }
    };
    xhr.send(file);
  };

  const beforeUpload = async (file: RcFile) => {
    setHeaders({
      "x-amz-acl": "public-read",
      "Content-Type": file.type,
    });
    const isMax50MB = file.size / 1024 / 1024 < 50;

    return isMax50MB;
  };

  const props: UploadProps = {
    name: "file",
    multiple: false,
    accept: acceptTypes,
    beforeUpload,
    customRequest: uploadImage,
    onRemove: (file) => {
      const removedIndex = fileList.findIndex(
        (image) => String(image.uid) === String(file.uid)
      );
      if (removeImage && removedIndex !== -1) {
        removeImage(removedIndex + 1);
        setFileList((prevList) =>
          prevList.filter((_, index) => index !== removedIndex)
        );
      }
    },
    onChange: (data) => {
      const { status } = data.file;
      uploadingStatus?.(status);
      if (!error) {
        setFileList(data.fileList);
      }
      setError(false);
    },
    headers,
    maxCount: multiple ? 99 : 1,
  };

  return (
    <div>
      {label ? <label className="upload-label mb-2">{label}</label> : null}
      {viewType && viewType === "defaultView" && (
        <Upload
          id={id}
          {...props}
          className="main-upload-input"
          listType="picture"
          onPreview={handlePreview}
          fileList={fileList}
        >
          {maxLength && fileList.length >= maxLength ? null : (
            <Button className="main-upload-input-btn" icon={<UploadOutlined />}>
              برجاء رفع الصورة
            </Button>
          )}
        </Upload>
      )}
      <Modal
        visible={isPreviewVisible}
        footer={null}
        onCancel={handleCancel}
        style={{ cursor: "pointer" }}
      >
        <div style={{ position: "relative", cursor: "pointer" }}>
          {isVideo ? (
            <video style={{ width: "100%" }} controls>
              <source src={previewMedia} type="video/mp4" />
              <source src={previewMedia} type="video/webm" />
              <source src={previewMedia} type="video/ogg" />
              {/* Fallback for browsers that don't support the provided formats */}
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={previewMedia} alt="Preview" style={{ width: "100%" }} />
          )}
        </div>
      </Modal>
    </div>
  );
}

export default UploadImage;
