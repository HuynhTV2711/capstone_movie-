export const saveLocal = (data, key)=>{
    const dataJSON = JSON.stringify(data);
    localStorage.setItem(key, dataJSON);
};
export const getLocal = (key)=>{
    const data = localStorage.getItem(key);
    return data? JSON.parse(data): null;
}