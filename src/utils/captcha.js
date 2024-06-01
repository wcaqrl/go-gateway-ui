import MD5 from "crypto-js/md5";
import { randStr } from "./str";
import config from "../config";

export function changeCaptcha() {
    let captchaUrl = config.govern_host + '/getCaptcha?id=';
    let captchaId  = MD5(randStr(10)).toString();
    return {captchaId, captchaUrl: captchaUrl + captchaId}
};