import axios from "axios";


const url = "http://localhost:8081/card";

export const CardService = {
    save : async (card) => {
        try {
            const response = await axios.post(url + "/save", card);
            return response;
        } catch (error) {
            console.error(error);
        }
    },

    list : async (id) => {
        try {
            const response = await axios.get(url + "/list/" + id);
            return response;
        } catch (error) {
            console.error(error);
        }
    },

    listFromUser : async (name, password) => {
        try {
            const response = await axios.get(url + "/listFromUser/" + name + "/" + password);
            return response;
        } catch (error) {
            console.error(error);
        }
    },
    
    listAll : async (page) => {
        try {
            const response = await axios.get(url + "/listAll?page=" + page);
            return response;
        } catch (error) {
            console.error(error);
        }
    },

    edit : async (id, card) => {
        try {
            const response = await axios.put(url + "/update/" + id, card);
            return response;
        } catch (error) {
            console.error(error);
        }
    },

    remove : (id) => {
        axios.delete(url + "/delete/" + id).then(response => {
            return response;
        }).catch(error => {
            console.error(error);
        });
        return "Ok";
    },

    getImages : async () => {
        try {
            const response = await axios.get(url + "/getImageTypes");
            return response;
        } catch (error) {
            console.error(error);
        }
    },

    getSigils : async () => {
        try {
            const response = await axios.get(url + "/getSigilsTypes");
            return response;
        } catch (error) {
            console.error(error);
        }
    },

    sendImage : (img) => {
        axios.post(url + "/sendImage", img).then(response => {
            return response;
        }).catch(error => {
            console.error(error);
        });
        return "Ok";
    },

    listImage : async (bucketName, keyName) => {
        try {
            const response = await axios.get(url + "/listImage/" + bucketName + "/" + keyName);
            return response;
        } catch (error) {
            console.error(error);
        }
    }
}