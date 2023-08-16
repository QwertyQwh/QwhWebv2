import SectionCatalog from "../Catalogs/SectionCatalog";

export function SectionLoader({params}){
    return SectionCatalog[params.section];
}
