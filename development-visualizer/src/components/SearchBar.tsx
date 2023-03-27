import { SetStateAction, Dispatch } from "react"

// Interface for typing the input data.
import { IEntry } from "../assets/Interfaces"

// Search function.
import { findName } from "../assets/SearchParsing"

function SearchBar({ searchArray, completeData }: { searchArray: Dispatch<SetStateAction<IEntry[] | []>>, completeData: IEntry[]}){
    
    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        searchArray(findName(event.target.value, completeData))
    }
    
    return(
        <section className='search-bar'>
            <input type="search"
            placeholder="Search Developer or Scrum Master"
            onChange={handleOnChange}
            />
        </section>
    )
}

export default SearchBar