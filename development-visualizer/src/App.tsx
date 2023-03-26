import { useEffect, useState } from 'react'
import { IEntry } from './assets/Interfaces'


// Styling
import './styling/App.css'
import Data from './assets/MockData.json'

// Components
import TableView from './components/TableView'
import SearchBar from './components/SearchBar'
import TotalAdd from './components/TotalAdd'

// String array for table column headers.
const TableHeaders = ["Product Name", "Owner", "Developers", "Scrum Master", "Start Date", "Methodology"]


function App() {

  const [entries, setEntries] = useState<IEntry[] | []>([])
  const [search, setSearches] = useState<IEntry[] | undefined>(undefined)

  useEffect(() =>{
    async function getProducts(){
      const response = await fetch('http://localhost:3000/api/products')
      if(!response.ok){
        const message = `An error occured ${response.statusText}`
        window.alert(message)
        return
      }

      const productJSON = await response.json()
      setEntries(productJSON)

    }

      getProducts()
      return

  }, [entries.length])

  return (
    <div>
      <section className='landing-title'>
        <h1>IMB Development/Maintainance Visualizer</h1>
      </section>
     <SearchBar searchArray={setSearches} completeData={entries} />
      <section>
        <TotalAdd searchResults={search} completeData={entries} />
        <TableView tableHeader={TableHeaders} tableData={entries}/>
      </section>
    </div>
  )
}

export default App
