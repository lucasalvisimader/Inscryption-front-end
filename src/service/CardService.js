// import React from "react";
import axios from "axios";


const url = "http://localhost:8081/card";

export const CardService = {
    save : (card) => {
        return axios.post(url + "/save", card).then(response => {
            return response;
        }).catch(error => {
            console.error(error);
        });
    },

    list : (id) => {
        return axios.get(url + "/list/" + id).then(response => {
            return response;
        }).catch(error => {
            console.error(error);
        });
    },
    
    listAll : () => {
        return axios.get(url + "/listAll").then(response => {
            return response;
        }).catch(error => {
            console.error(error);
        });
        // try {
        //     const response = await axios.get(url + "/listAll");
        //     return response;
        // } catch (error) {
        //     console.error(error);
        // }
    },

    edit : (id, card) => {
        return axios.put(url + "/update/" + id, card).then(response => {
            return response;
        }).catch(error => {
            console.error(error);
        });
    },

    remove : (id) => {
        axios.delete(url + "/delete/" + id).then(response => {
            return response;
        }).catch(error => {
            console.error(error);
        });
        return "Ok";
    },

    addImage : () => {
        return axios.get(url + "/addImage").then(response => {
            return response;
        }).catch(error => {
            console.error(error);
        });
    }
}