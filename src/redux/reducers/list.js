
const initialState = {
    list : [],
}

const list = (state = initialState, action) => {
    switch(action.type){
     
    case 'ALL_ITEMS': return state.list = action.payload;
    case 'USER_STATE': return  state.filter(user => user.adress.state === action.payload);
    case 'SORT_BY_ITEMS': return state.list = action.payload

    default : return state.list
    }
}

export default list;