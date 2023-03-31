import { SetStateAction, Dispatch } from 'react'
import { IEntry, IFormInfo } from '../assets/Interfaces'

// Styling.
import '../styling/TableViewStyles.css'

// Component.
import DeleteProduct from './DeleteProduct'

// Styling classNames for each column header.
const headerClassNames = new Map([
    ["Product Name", "pnCol"],
    ["Owner", "oCol"],
    ["Developers", "devCol"],
    ["Scrum Master", "smCol"],
    ["Start Date", "sdCol"],
    ["Methodology", "methodCol"],
])

// Function for setting the form to visible in edit mode, while also setting the changeProductData state from App.tsx to product associated with the edit button pressed.
function handleOnClick(formSet: Dispatch<SetStateAction<IFormInfo>>, productSet: Dispatch<SetStateAction<IEntry | undefined>>, currentProduct: IEntry){
    formSet({visible: true, editOrAdd: "edit"})
    productSet(currentProduct)
}

function TableView({tableHeader, tableData, formSettingInfo, productSetInfo}: {tableHeader: string[], tableData: IEntry[], formSettingInfo: Dispatch<SetStateAction<IFormInfo>>, productSetInfo: Dispatch<SetStateAction<IEntry | undefined>> }){


    return (
        <section>
            <table className='tableData'>
                <thead>
                    <tr>
                        {tableHeader.map((value, index) =>(
                            <th className={headerClassNames.get(value)}key={index} >{value}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                {tableData.map ((dataInfo, index) =>(
                    <tr className='tableRows' key={index}>
                        <td className='dataCol'>{dataInfo.productName}</td>
                        <td className='dataCol'>{dataInfo.productOwnerName}</td >
                        <td className='dataCol'>{dataInfo.Developers.join(', ')}</td>{/*The .join(', ') converts the array into a string like so: Dev1, Dev2, Dev3, Dev4, Dev5*/}
                        <td className='dataCol'>{dataInfo.scrumMasterName}</td>
                        <td className='dataCol'>{dataInfo.startDate}</td>
                        <td className='dataCol'>{dataInfo.methodology}</td>
                        <td className='modifyBTNS'>
                            <div className='CTAbtns'>
                                <DeleteProduct selectedProduct={dataInfo} />
                                <button className='editBTN goodBTN' key={dataInfo.productId} onClick={() => handleOnClick(formSettingInfo, productSetInfo, dataInfo)}>Edit</button>
                            </div>
                        </td>
                    </tr>
            ))} 
            </tbody>
            </table>
        </section>
    )
}

export default TableView