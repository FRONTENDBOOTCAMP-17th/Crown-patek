import { getProfileApi } from "../API/profile/getProfileApi";
import { getToken } from "../API/token/getToken";
import { loadProfile } from "./loadProfile";

async function handlerProfile(){
    const data = await getProfileApi(getToken())
    loadProfile(data);
    console.log(data);
}
handlerProfile();