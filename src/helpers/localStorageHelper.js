export const getFromLocalStorage = key => {
    const value = localStorage.getItem(key); 
  
    let dataCharacters = null; 
    try {
      const parsedJSON = JSON.parse(value);
  
      if (Array.isArray(parsedJSON)) {
        dataCharacters = parsedJSON;
      }
    } catch(e) {
      dataCharacters = [];
    }
    
    return dataCharacters;
  }
  
  export const saveToLocalStorage = (key, dataCharacters) => localStorage.setItem(key, JSON.stringify(dataCharacters));