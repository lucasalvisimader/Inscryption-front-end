import AxiosInstance from "./Axios";

export const ImageCardService = {
    sendImage : (img, idCard) => {
        AxiosInstance.post("/imageCard/sendImage/" + idCard, img).then(response => {
            return response;
        }).catch(error => {
            console.error(error);
        });
        return "Ok";
    },

    listImage : async (bucketName, idCard) => {
        try {
            return await AxiosInstance.get("/imageCard/listImage/" + bucketName + "/" + idCard);
        } catch (error) {
            console.error(error);
        }
    }
}