const toSnakeCase = obj => {
  const regex = /[A-Z]/
  const replace = match => `_${match.toLowerCase()}`;

  const newObj = {...obj}

  for ( const key in obj ) {
    if (RegExp(regex).test(key)) {
      Object.defineProperty(newObj, key.replace(regex, replace),
        Object.getOwnPropertyDescriptor(newObj, key));
      delete newObj[key];
    }
  }
  return newObj;
};

export default toSnakeCase;
