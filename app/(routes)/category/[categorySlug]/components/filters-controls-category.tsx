import FilterMateria from "./filter-materia";

type FiltersControlsCategoryProps = {
    setFilterMateria: (materia: string) => void
}

const FiltersControlsCategory = (props: FiltersControlsCategoryProps) => {
    const {setFilterMateria} = props
    return ( 
        <div className="sm:w-[358px] sm:mt-5 p-3">
            <FilterMateria setFilterMateria={setFilterMateria} />
        </div>
     );
}
 
export default FiltersControlsCategory;