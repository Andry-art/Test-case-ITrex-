
export const getAllItems = (data) =>{ 
    return { 
      type: 'ALL_ITEMS',
      payload: data,
    }
  }