import Catalog from "../Catalogs/BlogCatalog"
export function BlogLoader({params}){
    return Catalog[params.id];
}
