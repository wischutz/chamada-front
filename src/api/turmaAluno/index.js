import { requests } from "@/components/helper/requests";

const apiTurmaAluno = {
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
    create (params) {
        const a = requests.post(params.url, params.formulario, params.token);
        return a;
    },
    update (params) {
        const a = requests.put(params.url, params.formulario, params.token);
        return a;
    },
}
export default apiTurmaAluno;
  