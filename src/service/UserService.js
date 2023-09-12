import AxiosInstance from "./Axios";

export const UserService = {
    save : async (user) => {
        try {
            return await AxiosInstance.post("/user/save", user);
        } catch (error) {
            console.error(error);
        }
    },

    getUser : async () => {
        try {
            return await AxiosInstance.get("/user/getUser");
        } catch (error) {
            console.error(error);
        }
    },

    login : async (userLogin) => {
        try {
            return await AxiosInstance.post("/user/login", userLogin);
        } catch (error) {
            console.error(error);
        }
    },

    edit : async (id, user) => {
        try {
            return await AxiosInstance.put("/user/update/" + id, user);
        } catch (error) {
            console.error(error);
        }
    },

    remove : async (id) => {
        await AxiosInstance.delete("/user/delete/" + id).then(response => {
            return response;
        }).catch(error => {
            console.error(error);
        });
    },
}