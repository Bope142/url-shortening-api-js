import {
    addUrlHitory,
} from './database.js';

export const shorteningLink = async (link)=>{
  let url = `https://api.shrtco.de/v2/shorten?url=${link}`;
  try {
     let response = await fetch(url);
     let data = await response.json();
     renderUsers(data)
     console.warn(data)
  } catch(error) {
    console.error(error);
  }
}

export const renderUsers = async (result) =>{
  if(result.ok){
    let data = result.result;
    addUrlHitory(data.full_short_link,data.original_link)
  }
}
