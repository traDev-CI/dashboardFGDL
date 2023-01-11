import React, { useState, useEffect } from "react";
import ListImages from "../../../components/admin/ListImages/ListImages";
import { getAccesToken } from "../../../api/auth";
import { getDataImagesApi } from "../../../api/image";

const Images = () => {
  const [images, setImages] = useState([]);
  const [reloadImages, setReloadImages] = useState(false);
  const token = getAccesToken();

  useEffect(() => {
    getDataImagesApi(token).then((response) => {
      setImages(response.images);
    });
    setReloadImages(false);
  }, [token, reloadImages]);
  return (
    <>
      <ListImages images={images} setReloadImages={setReloadImages} />
    </>
  );
};

export default Images;
