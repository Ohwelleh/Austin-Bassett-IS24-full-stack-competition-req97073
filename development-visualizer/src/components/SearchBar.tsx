import { SetStateAction, Dispatch } from "react"
import { IEntry } from "../assets/Interfaces"

function SearchBar({ searchArray, completeData }: { searchArray: Dispatch<SetStateAction<IEntry[] | undefined>>, completeData: IEntry[]}){
    return(
        <section className='search-bar'>
            <input type="text"
            placeholder="Search Developer or Scrum Master"
            />
        </section>
    )
}

export default SearchBar