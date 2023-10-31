import AxiosInstance from "./Axios";

export const CardService = {
    save : async (card) => {
        try {
            return await AxiosInstance.post("/card/save", card);
        } catch (error) {
            console.error(error);
        }
    },

    list : async (id) => {
        try {
            return await AxiosInstance.get("/card/list/" + id);
        } catch (error) {
            console.error(error);
        }
    },

    listFromUser : async () => {
        try {
            return await AxiosInstance.get("/card/listFromUser");
        } catch (error) {
            console.error(error);
        }
    },
    
    listAll : async (page) => {
        try {
            return await AxiosInstance.get("/card/listAll?page=" + page);
        } catch (error) {
            console.error(error);
        }
    },

    qtyCost : async (id) => {
        try {
            return await AxiosInstance.get("/card/qtyCost/" + id);
        } catch (error) {
            console.error(error);
        }
    },

    edit : async (id, card) => {
        try {
            return await AxiosInstance.put("/card/update/" + id, card);
        } catch (error) {
            console.error(error);
        }
    },

    remove : (id) => {
        AxiosInstance.delete("/card/delete/" + id).then(response => {
            return response;
        }).catch(error => {
            console.error(error);
        });
        return "Ok";
    },

    getImages : async () => {
        try {
            return await AxiosInstance.get("/card/getImageTypes");
        } catch (error) {
            console.error(error);
        }
    },

    getSigils : async () => {
        try {
            return await AxiosInstance.get("/getSigilsTypes");
        } catch (error) {
            console.error(error);
        }
    }
}