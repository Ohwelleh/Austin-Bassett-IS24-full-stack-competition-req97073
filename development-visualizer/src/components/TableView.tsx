import Data from '../assets/MockData.json'
import '../styling/TableViewStyles.css'

import { IEntry } from '../assets/Interfaces'

const test = ["one", "two"]

function TableView({tableHeader, tableData}: {tableHeader: string[], tableData: IEntry[]}){
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
                <tr key={index}>
                    <td>{dataInfo.productName}</td>
                    <td>{dataInfo.productOwnerName}</td>
                    <td>{dataInfo.Developers.map((name, index) =>(<p>{name}</p>))}</td>
                    <td>{dataInfo.scrumMasterName}</td>
                    <td>{dataInfo.startDate}</td>
                    <td>{dataInfo.methodology}</td>
                    <td><button>Edit</button></td>
                </tr>
            ))} 
            </tbody>
            </table>
        </section>
    )
}

export default TableView