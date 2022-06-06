import axios from "axios";
axios.defaults.timeout = 10000;
// eslint-disable-next-line import/no-anonymous-default-export
export default async (url) => {
    axios.defaults.withCredentials=true;
    let data = (await axios.get (url, {
        params: {
        }
    })).data.data;
    console.log("get page details",data)
}