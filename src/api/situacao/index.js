import { requests } from "@/components/helper/requests";

const apiSituacao = {
    get (params) {
        var str = "";
        if(params.data instanceof Object) {
            str = '?' + Object.keys(params.data).reduce(function(a, k){
                a.push(k + '=' + encodeURIComponent(params.data[k]));
                return a;
            }, []).join('&');
        }
        const a = requests.get(params.url + str, params.cookie);
        return a;
    },
    read (params) {
        const a = requests.get(params.url, params.cookie);
        return a;
    },
}
export default apiSituacao;
  