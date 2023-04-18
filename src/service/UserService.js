// import React from "react";
import axios from "axios";


const url = "http://localhost:8081/user";

export const UserService = {
    save : async (user) => {
        try {
            const response = await axios.post(url + "/save", user);
            return response;
        } catch (error) {
            console.error(error);
        }
    },

    listAll : async () => {
        try {
            const response = await axios.get(url + "/listAll");
            return response;
        } catch (error) {
            console.error(error);
        }
        // try {
        //     const response = await axios.get(url + "/listAll");
        //     return response;
        // } catch (error) {
        //     console.error(error);
        // }
    },

    list : async (id) => {
        try {
            const response = await axios.get(url + "/list/" + id);
            return response;
        } catch (error) {
            console.error(error);
        }
    },

    listLogin : async (name, password) => {
        try {
            const response = await axios.get(url + "/listLogin/" + name + "/" + password);
            return response;
        } catch (error) {
            console.error(error);
        }
    },
    
    listType : async (id) => {
        try {
            const response = await axios.get(url + "/listType/" + id);
            return response;
        } catch (error) {
            console.error(error);
        }
    },

    edit : async (id, user) => {
        try {
            const response = await axios.put(url + "/update/" + id, user);
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
    },
}