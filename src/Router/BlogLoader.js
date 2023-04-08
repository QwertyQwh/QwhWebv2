import Catalog from "../Catalogs/BlogCatalog"
export function BlogLoader({params}){
    if(Catalog[params.id]){
        return Catalog[params.id];
    }
    return null;
}
