import AxiosInstance from "./Axios";

export const CardService = {
    save : async (board) => {
        try {
            return await AxiosInstance.post("/board/save", board);
        } catch (error) {
            console.error(error);
        }
    },
    list : async (id) => {
        try {
            return await AxiosInstance.get("/board/list/" + id);
        } catch (error) {
            console.error(error);
        }
    },

    listFromUser : async (cardPosition) => {
        try {
            return await AxiosInstance.get("/board/changePlayerCardPosition/" + id, cardPosition);
        } catch (error) {
            console.error(error);
        }
    }
}