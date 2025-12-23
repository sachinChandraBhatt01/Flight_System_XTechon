import api from "./axios.js"

export const checkAuth = async () => {
    try {
        await api.get("/auth/me")
        // console.log(res)
        return true;
    } catch (err) {
        console.error("error" ,err)
        return false;
    }
}
