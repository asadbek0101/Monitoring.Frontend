export function pathParams(url: string, params: any){
    if(Object.keys(params).length > 0){
        console.log("Params is true")
        return url.replace( url.substring(url.indexOf(":")), params[url.substring(url.indexOf(":")+1)]) 
    }else {
        return url
    }
}