import './styling/App.css'
import Data from './assets/MockData.json'

// Components
import TableView from './components/TableView'
import SearchBar from './components/SearchBar'
import TotalAdd from './components/TotalAdd'

// String array for table column headers.
const TableHeaders = ["Product Name", "Owner", "Developers", "Scrum Master", "Start Date", "Methodology"]



function App() {

  return (
    <div>
      <section className='landing-title'>
        <h1>IMB Development/Maintainance Visualizer</h1>
      </section>
     <SearchBar />
      <section>
        <TotalAdd />
        <TableView TableHeader={TableHeaders}/>
      </section>
    </div>
  )
}

export default App