import './Table.css'
import React from 'react'
import { useState } from 'react'
import errow from '../bleach.svg'
import { sortItems } from '../redux/actions/sortByItems'
import { useDispatch } from 'react-redux'



function Table({ table, previousPage, nextPage, page, ind, ind2, }) {
    const dispatch = useDispatch()

    const [choosen, setChoosen] = useState()
    const [showUser, setShowUser] = useState(false)
    const [tableTitle, setTableTitle] = useState([  { id: 1, title: 'ID', column: 'id' },
                                                    { id: 2, title: 'first Name', column: 'firstName' },
                                                    { id: 3, title: 'Last Name', column: 'lastName' },
                                                    { id: 4, title: 'Email', column: 'email' },
                                                    { id: 5, title: 'Phone', column: 'phone' }  ])

    const [sortedDown, setSortedDown] = useState()
    const [sortedUp, setSortedUp] = useState()
    const [indicatorUp, setIndicatorUp] = useState()
    const [indicatorDown, setIndicatorDown] = useState()


    const handleClick = (id) => {
        setShowUser(true)
        setChoosen(table.filter(user => user.id === id))
    }

    const sortItem = (id, column) => {
        if (id === 1) {

            if (!sortedDown) {
                setIndicatorDown()
                setIndicatorUp(id)
                dispatch(sortItems(table.sort((a, b) => a[column] - b[column])))
                setSortedDown(table.sort((a, b) => a[column] - b[column]))
            } if (sortedDown) {
                setIndicatorUp()
                setIndicatorDown(id)
                setSortedDown()
                dispatch(sortItems(table.sort((a, b) => b[column] - a[column])))
                setSortedUp(table.sort((a, b) => b[column] - a[column]))
            }
        }

        if (id === 2 || id === 3 || id === 4) {

            if (!sortedDown) {
                setIndicatorDown()
                setIndicatorUp(id)
                dispatch(sortItems(table.sort((prev, next) => {
                    if (prev[column] < next[column]) { return -1 }
                    if (prev[column] < next[column]) { return 1 }
                })))
                setSortedDown(table.sort((prev, next) => {
                    if (prev[column] < next[column]) { return -1 }
                    if (prev[column] < next[column]) { return 1 }
                }))
            } if (sortedDown) {
                setIndicatorUp()
                setIndicatorDown(id)
                setSortedDown()
                dispatch(sortItems(table.sort((prev, next) => {
                    if (prev[column] > next[column]) { return -1 }
                    if (prev[column] > next[column]) { return 1 }
                })))
                setSortedUp(table.sort((prev, next) => {
                    if (prev[column] > next[column]) { return -1 }
                    if (prev[column] > next[column]) { return 1 }
                }))
            }
        }

        if (id === 5) {
            if (!sortedDown) {
                setIndicatorDown()
                setIndicatorUp(id)
                dispatch(sortItems(table.sort((a, b) => 
                Number(a.phone.replace(/[^\w\s!?]/g, '')) - Number(b.phone.replace(/[^\w\s!?]/g, '')))))
                setSortedDown(table.sort((a, b) => 
                Number(a.phone.replace(/[^\w\s!?]/g, '')) - Number(b.phone.replace(/[^\w\s!?]/g, ''))))

            } if (sortedDown) {
                setIndicatorUp()
                setIndicatorDown(id)
                setSortedDown()
                dispatch(sortItems(table.sort((a, b) => 
                Number(b.phone.replace(/[^\w\s!?]/g, '')) - Number(a.phone.replace(/[^\w\s!?]/g, '')))))
                setSortedUp(table.sort((a, b) => 
                Number(b.phone.replace(/[^\w\s!?]/g, '')) - Number(a.phone.replace(/[^\w\s!?]/g, ''))))
            }
        }

    }


    return <>

        <table className="table">
            <tr className="title">
                {tableTitle.map(title => <th className="main-row"  key={title.id} onClick={() => sortItem(title.id, title.column)}>{title.title}
                    <img className={sortedDown && indicatorUp === title.id ? 'errowUp_active' : 'errowUp'} src={errow} />
                    <img className={sortedUp && indicatorDown === title.id ? 'errowDown_active' : 'errowDown'} src={errow} /></th>)}
                <th className="id">State</th>
            </tr>
            {table.map(({ id, firstName, lastName, email, phone, adress }, index) =>
                (index < ind && index >= ind2) && <tr key={`${index} ${id}`} className="row" onClick={() => handleClick(id)}>
                    <td className="id">{id}</td>
                    <td className="name">{firstName}</td>
                    <td className="lastname">{lastName}</td>
                    <td className="email">{email}</td>
                    <td className="phone">{phone}</td>
                    <td className="id">{adress.state}</td>
                </tr>)}
        </table>
        <div className="pages">
            <button onClick={() => previousPage()}>PREVIOUS</button>
            <p>{page}</p>
            <button onClick={() => nextPage()}>NEXT</button>
        </div>

        <div className="choosenUser">
            {showUser && choosen.map(user => <div>
                <h1 className='profile'>Profile info</h1>
                <div className='selected'>
                    <h3>Selected profile:</h3> <p>{user.firstName} {user.lastName}</p>
                </div>
                <div className='selected'>
                    <h3>Adress:</h3> <p>{user.adress.streetAddress}</p>
                </div>
                <div className='selected'>
                    <h3>State:</h3> <p>{user.adress.state}</p>
                </div>
                <div className='selected'>
                    <h3>Index:</h3> <p>{user.adress.zip}</p>
                </div>
                <div className="description">
                    <h3>Description:</h3> <p>{user.description}</p>
                </div>
            </div>
            )}
        </div>


    </>
}

export default Table;
