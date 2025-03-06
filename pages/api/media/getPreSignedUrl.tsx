import client from "@/helpers/client";

const endpoint = "/api/uploads/files";

const getPreSignedUrl = async (fileKey: string) => {
  const options = {
    params: {
      key: fileKey,
    },
  };

  const response = await client.post(endpoint, {}, options);
  return response.data;
};
export default getPreSignedUrl;
