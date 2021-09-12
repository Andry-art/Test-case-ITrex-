import './App.css';
import Header from './components/Header';
import axios from 'axios'
import { useState, useEffect } from 'react'
import Table from './components/Table';
import { useSelector, useDispatch } from 'react-redux'
import { getAllItems } from './redux/actions/allItems'


function App() {

  useEffect(() => {
    axios.get('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}')
      .then(({ data }) => dispatch(getAllItems(data)))
  }, [])

  const dispatch = useDispatch()
  let table = useSelector((state) => { return state.list })

  const [ind, setInd] = useState(20)
  const [ind2, setInd2] = useState(0)
  const [page, setPage] = useState(1)
  const [inputValue, setInputValue] = useState('')

  table = table.filter(name => name.firstName.toLowerCase().startsWith(inputValue.toLowerCase()))

  const nextPage = () => {
    if (table.length > 20) {
      if (page < 2) {
        setInd(ind + 20)
        setInd2(ind2 + 20)
        setPage(page + 1)
      }
    }
  }

  const previousPage = () => {
    if (page > 1) {
      setInd(ind - 20)
      setInd2(ind2 - 20)
      setPage(page - 1)
    }
  }

  return <>
    <Header previousPage={previousPage} setInputValue={setInputValue} />
    <Table table={table} nextPage={nextPage} previousPage={previousPage} page={page} ind={ind} ind2={ind2} />
  </>
}

export default App;
