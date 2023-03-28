import { SetStateAction, Dispatch } from 'react'
import '../styling/TableViewStyles.css'

import { IEntry, IFormInfo } from '../assets/Interfaces'


function handleOnClick(formSet: Dispatch<SetStateAction<IFormInfo>>, productSet: Dispatch<SetStateAction<IEntry | undefined>>, currentProduct: IEntry){
    formSet({visible: true, editOrAdd: "edit"})
    productSet(currentProduct)
}

function TableView({tableHeader, tableData, formSettingInfo, productSetInfo}: {tableHeader: string[], tableData: IEntry[], formSettingInfo: Dispatch<SetStateAction<IFormInfo>>, productSetInfo: Dispatch<SetStateAction<IEntry | undefined>>}){

    return (
        <section>
            <table>
                <tbody>
                <tr>
                    {tableHeader.map((value, index) =>(
                    <th key={index} >{value}</th>
                    ))}
                </tr>
            {tableData.map ((dataInfo, index) =>(
                <tr key={dataInfo.productId}>
                    <td>{dataInfo.productName}</td>
                    <td>{dataInfo.productOwnerName}</td>
                    <td>{dataInfo.Developers.join(', ')}</td>
                    <td>{dataInfo.scrumMasterName}</td>
                    <td>{dataInfo.startDate}</td>
                    <td>{dataInfo.methodology}</td>
                    <td><button key={dataInfo.productId} onClick={() => handleOnClick(formSettingInfo, productSetInfo, dataInfo)}>Edit</button></td>
                </tr>
            ))} 
            </tbody>
            </table>
        </section>
    )
}

export default TableView