import { SetStateAction, Dispatch } from 'react'
import { IEntry, IFormInfo } from '../assets/Interfaces'
import '../styling/TASBarStyles.css'

// Search function.
import { findName } from "../assets/SearchParsing"

function handleOnClick(formSet: Dispatch<SetStateAction<IFormInfo>>, productSet: Dispatch<SetStateAction<IEntry | undefined>>){
    formSet({visible: true, editOrAdd: "add"})
    productSet(undefined)
}


function TASBar({searchResults, completeData, formSettingInfo, productSetInfo, searchArray}: {searchResults: IEntry[], completeData: IEntry[] | [], formSettingInfo: Dispatch<SetStateAction<IFormInfo>>, productSetInfo: Dispatch<SetStateAction<IEntry | undefined>>, searchArray: Dispatch<SetStateAction<IEntry[] | []>>}){
    var totalAmount = searchResults === undefined ? completeData.length : searchResults.length

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        searchArray(findName(event.target.value, completeData))
    }

    return(
        <section className='TAS'>
            <div className='total'>
                <h2>Total: {totalAmount}</h2>
            </div>
            <div className='search-div'>
                <input className='searchBar' type="search"
                placeholder="Search for Developer or Scrum Master Name"
                onChange={handleOnChange}
                />
            </div>
            <div className='add-div'>
                <button className='addBTN goodBTN' onClick={() => handleOnClick(formSettingInfo, productSetInfo)}>Add</button>
            </div>
        </section>
    )
}

export default TASBar