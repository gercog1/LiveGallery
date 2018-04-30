export const formatDescription = str => {
  if(str.length > 40){
    return str.slice(0, 32) + '...';
  }
  return str;
};