export const required = (value) => {
  if(value){
    return undefined;
  }else{
    return 'Field is required';
  }
};


export const maxLengthCreator = (maxLength) => (value) => {
  if(value && value.length < maxLength){
    return undefined;
  }else{
    return `Max lenght is ${maxLength} symbols`;
  }
};