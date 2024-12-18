import { toast } from "react-toastify";
const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`;

// console.log(process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);

const uploadFile = async (file) => {

  try {
    toast.warning("File uploading is in process.", {
      position: "top-center",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ChatHorizon");
  
    const response = await fetch(url, {
      method: "post",
      body: formData,
    });
  
    const responseData = await response.json();
  
    return responseData;  
  } catch (error) {
    toast.error("Something went wrong..", {
      position: "top-center",
      autoClose: 10000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export default uploadFile;
