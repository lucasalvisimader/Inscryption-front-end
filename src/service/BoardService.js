import AxiosInstance from "./Axios";

export const CardService = {
    list : async (id) => {
        try {
            return await AxiosInstance.get("/board/list/" + id);
        } catch (error) {
            console.error(error);
        }
    },

    getNewBoard : async () => {
        try {
            return await AxiosInstance.put("/board/getNewBoard");
        } catch (error) {
            console.error(error);
        }
    },

    changePlayerCardPosition : async (cardPosition) => {
        try {
            return await AxiosInstance.put("/board/changePlayerCardPosition", cardPosition);
        } catch (error) {
            console.error(error);
        }
    }
}