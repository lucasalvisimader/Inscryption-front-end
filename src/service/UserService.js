// import React from "react";
import axios from "axios";


const url = "http://localhost:8081/user";

export const UserService = {
    save : (user) => {
        return axios.post(url + "/save", user).then(response => {
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

    edit : (id, user) => {
        return axios.put(url + "/update/" + id, user).then(response => {
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
    }
}