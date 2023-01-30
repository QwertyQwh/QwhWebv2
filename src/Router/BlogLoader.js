import Catalog from "./Catalog"
export function BlogLoader({params}){
    return Catalog[params.id];
}
