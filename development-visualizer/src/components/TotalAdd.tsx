import { SetStateAction, Dispatch } from 'react'
import { IEntry, IFormInfo } from '../assets/Interfaces'
import '../styling/TotalAddStyles.css'

function handleOnClick(formSet: Dispatch<SetStateAction<IFormInfo>>, productSet: Dispatch<SetStateAction<IEntry | undefined>>){
    formSet({visible: true, editOrAdd: "add"})
    productSet(undefined)
}


function TotalAdd({searchResults, completeData, formSettingInfo, productSetInfo}: {searchResults: IEntry[], completeData: IEntry[] | [], formSettingInfo: Dispatch<SetStateAction<IFormInfo>>, productSetInfo: Dispatch<SetStateAction<IEntry | undefined>>}){
    var totalAmount = searchResults === undefined ? completeData.length : searchResults.length

    return(
        <section className='total-add'>
            <div className='total'>
                <h3>Total: {totalAmount}</h3>
            </div>
            <div className='add-div'>
                <button onClick={() => handleOnClick(formSettingInfo, productSetInfo)}>Add</button>
            </div>
        </section>
    )
}

export default TotalAdd