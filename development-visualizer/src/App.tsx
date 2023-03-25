import './App.css'
import Data from './assets/MockData.json'

const TableHeader = ["Product Name", "Owner", "Developers", "Scrum Master", "Start Date", "Methodology"]

function App() {


  return (
    <div>
      <section>
        <h1>IMB Development/Maintainance Visualizer</h1>
      </section>
      <section>
        <h2>Search Bar</h2>
      </section>
      <section>
        <section>
          <h3>Total: </h3>
          <h3>Add</h3>
        </section>
        <table>
          <tr>
            {TableHeader.map((value, index) =>(
              <th key={index} >{value}</th>
            ))}
          </tr>
          {Data.map((dataInfo, index) =>(
            <tr key={index}>
              <td>{dataInfo.productName}</td>
              <td>{dataInfo.productOwnerName}</td>
              <td>{dataInfo.Developers}</td>
              <td>{dataInfo.scrumMasterName}</td>
              <td>{dataInfo.startDate}</td>
              <td>{dataInfo.methodology}</td>
            </tr>
          ))}
        </table>
      </section>
    </div>
  )
}

export default App
