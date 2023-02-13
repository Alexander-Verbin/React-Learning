
export type ValidatorsType = (value: string) => string | undefined
export const required:ValidatorsType = (value) => {
  if(value){
    return undefined;
  }else{
    return 'Field is required';
  }
};


export const maxLengthCreator = (maxLength: number):ValidatorsType => (value) => {
  if(value && value.length < maxLength){
    return undefined;
  }else{
    return `Max length is ${maxLength} symbols`;
  }
};