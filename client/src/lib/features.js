import moment from "moment";

const fileFormat = (url="") => {
    const fileExt = url.split(".").pop()

    if (fileExt === "mp4" || fileExt === "webm" || fileExt === "ogg")
        return "video";

    if (fileExt === "mp3" || fileExt === "wav")
        return "audio";
    
    if (fileExt === "png" || fileExt === "jpg" || fileExt === "jpeg" || fileExt === "gif")
        return "image";
    
    return "file"
};
 
const transfromImage = (url = "", width = 100) => {
  if (!url.includes("upload/")) return url;

  return url.replace("upload/", `upload/dpr_auto/w_${width}/`);
};

const getLast70Days = () => { 
    const currentData = moment();

    const last7Days =[];

    for (let i = 0; i < 7; i++)
    {
        const dayDate = currentData.clone().subtract(i, "days");
        const dayName = dayDate.format("dddd")
        
        last7Days.unshift(dayName)
    }

    return last7Days;
};

const getOrSaveFromStorage = ({key, value, get }) => {
    if (get) return localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key))
        : null;
    else localStorage.setItem(key, JSON.stringify(value));
}

export { fileFormat, transfromImage, getLast70Days, getOrSaveFromStorage };