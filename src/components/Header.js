import React from 'react'
import "./Header.css"
import { useDispatch } from 'react-redux'
import { sortByState } from '../redux/actions/sortByState'
import { getAllItems } from '../redux/actions/allItems'
import { useState, useEffect } from 'react'
import axios from 'axios'



function Header({ previousPage, setInputValue }) {
  const dispatch = useDispatch()

  const [userStates, setUsersStates] = useState([])
  const [value, setValue] = useState()

  useEffect(() => {
    axios.get('http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&adress={addressObject}&description={lorem|32}')
      .then(({ data }) => setUsersStates(data))
  }, [])


  const handleChange = (event) => {
    setValue(event.target.value)
    sortList(event.target.value)

  }

  const sortList = (value) => {
    if (value === 'All') {
      dispatch(getAllItems(userStates))
      previousPage()
    } else {
      dispatch(getAllItems(userStates))
      dispatch(sortByState(value))
      previousPage()
    }
  }

  const usersFilter = (event) => {
    setInputValue(event.target.value)
    previousPage()
  }



  return <>
    <div className="header">
      <input type="text" onChange={(event) => usersFilter(event)} placeholder="Search by name"></input>
      <select onChange={(e) => handleChange(e)} value={value} className="select">
        <option value='All'>All</option>
        {[...new Set(userStates.map(it => it.adress.state))].map(it => <option key={it} value={it} >{it}</option>)}
      </select>
    </div>
  </>
}

export default Header;
