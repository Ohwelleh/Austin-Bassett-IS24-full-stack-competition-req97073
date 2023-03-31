import { SetStateAction, Dispatch } from 'react'
import { IEntry, IFormInfo } from '../assets/Interfaces'

// Styling.
import '../styling/TASBarStyles.css'

// Custom search function.
import { findName } from "../assets/SearchParsing"

// Function for setting the form to visible in add mode, while also setting the changeProductData state from App.tsx to undefined.
function handleOnClick(formSet: Dispatch<SetStateAction<IFormInfo>>, productSet: Dispatch<SetStateAction<IEntry | undefined>>){
    formSet({visible: true, editOrAdd: "add"})
    productSet(undefined)
}

// TASBar stands for Total Add Search Bar.
function TASBar({searchResults, completeData, formSettingInfo, productSetInfo, searchArray}: {searchResults: IEntry[], completeData: IEntry[] | [], formSettingInfo: Dispatch<SetStateAction<IFormInfo>>, productSetInfo: Dispatch<SetStateAction<IEntry | undefined>>, searchArray: Dispatch<SetStateAction<IEntry[] | []>>}){
    
    // Storing either the total products from the search state or the total products from the entries state.
    var totalAmount = searchResults === undefined ? completeData.length : searchResults.length

    // Calling the custom search function with the value from the input field.
    // the returned IEntry[] is set to the search state in App.tsx 
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