
export const sortItems = (it) =>{ 
    return { 
      type: 'SORT_BY_ITEMS',
      payload: it,
    }
  }