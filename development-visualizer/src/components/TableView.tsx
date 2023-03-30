import { SetStateAction, Dispatch, useState } from 'react'
import '../styling/TableViewStyles.css'

import DeleteProduct from './DeleteProduct'
import { IEntry, IFormInfo } from '../assets/Interfaces'

const headerClassNames = new Map([
    ["Product Name", "pnCol"],
    ["Owner", "oCol"],
    ["Developers", "devCol"],
    ["Scrum Master", "smCol"],
    ["Start Date", "sdCol"],
    ["Methodology", "methodCol"],
])

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
                    <tr className='tableRows' key={dataInfo.productId}>
                        <td className='dataCol'>{dataInfo.productName}</td>
                        <td className='dataCol'>{dataInfo.productOwnerName}</td >
                        <td className='dataCol'>{dataInfo.Developers.join(', ')}</td>
                        <td className='dataCol'>{dataInfo.scrumMasterName}</td>
                        <td className='dataCol'>{dataInfo.startDate}</td>
                        <td className='dataCol'>{dataInfo.methodology}</td>
                        <td className='modifyBTNS'>
                            <div className='CTAbtns'>
                                <DeleteProduct selectedProduct={dataInfo} />
                                <button className='editBTN goodBTN' key={dataInfo.productId} onClick={() => handleOnClick(formSettingInfo, productSetInfo, dataInfo)}>E</button>
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