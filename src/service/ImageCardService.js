import axios from "axios";

const url = "http://localhost:8081/imageCard";

export const ImageCardService = {
    sendImage : (img, idCard) => {
        axios.post(url + "/sendImage/" + idCard, img).then(response => {
            return response;
        }).catch(error => {
            console.error(error);
        });
        return "Ok";
    },

    listImage : async (bucketName, idCard) => {
        try {
            const response = await axios.get(url + "/listImage/" + bucketName + "/" + idCard);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
}