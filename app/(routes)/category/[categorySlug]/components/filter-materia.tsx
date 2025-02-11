import { useGetProductField } from "@/api/getProductField";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FilterTypes } from "@/types/filters";

type FiltersMateriaProps = {
    setFilterMateria: (materia: string) => void
}


const FilterMateria = (props: FiltersMateriaProps) => {
    const {setFilterMateria} = props
    const {result, loading}:FilterTypes = useGetProductField()


    return ( 
        <div className="my-5">
            <p className="mb-3 font-bold">Materia</p>
            {loading && result == null && (
                <p>Cargando materias..</p>
            )}
            <RadioGroup onValueChange={(value) => setFilterMateria(value)}>
                {result !== null && result.schema.attributes.materia.enum.map((materia: string) => (
                    <div key={materia} className="flex items-center space-x-2">
                    <RadioGroupItem value={materia} id={materia} />
                    <Label htmlFor={materia}> {materia}</Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
     );
}
 
export default FilterMateria
