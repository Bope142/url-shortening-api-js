export const shorteningLink = async (link)=>{
  let url = `https://api.shrtco.de/v2/shorten?url=${link}`;
  try {
     let response = await fetch(url);
     let data = await response.json();
     console.warn(data)
  } catch(error) {
    console.error(error);
    return error
  }
}
