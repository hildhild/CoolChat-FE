import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";

export const dateTimeToString = (date) => {
  return date.toLocaleString("vi-VN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};

export const formatFileSize = (bytes) => {
  const units = ["Bytes", "KB", "MB", "GB", "TB"];
  let i = 0;
  while (bytes >= 1024 && i < units.length - 1) {
    bytes /= 1024;
    i++;
  }
  return `${bytes.toFixed(2)} ${units[i]}`;
};

export const getCroppedImg = async (imageSrc, pixelCrop, file) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        console.error("Error creating Blob");
        return;
      }
      const newFile = new File([blob], file.name, { type: file.type });

      resolve({
        file: newFile,
        url: URL.createObjectURL(blob),
      });
    }, file.type);
  });
};

const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = url;
    image.onload = () => resolve(image);
    image.onerror = (error) => reject(error);
  });

export const formatTimeFromNow = (timestamp) => {
  dayjs.extend(relativeTime);
  dayjs.locale("vi");
  return dayjs(timestamp)
    .fromNow(true)
    .replace("một", "1")
    .replace("vài", "Vài");
};

export const truncateString = (str, maxLength) => {
  return str?.length > maxLength ? str.slice(0, maxLength) + "..." : str;
};

export const getFirstAndLastDayString = (year, month) => {
  const firstDay = new Date(year, month - 1, 2);
  const lastDay = new Date(year, month, 1);

  const formatDate = (date) => date.toISOString().slice(0, 10);

  return {
    firstDay: formatDate(firstDay),
    lastDay: formatDate(lastDay),
  };
};
