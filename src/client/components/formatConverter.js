// General Conversions
export function arrayToObj(givenArr, key) {
    let desObj = {};
    givenArr.forEach((l) => { desObj[l[key]] = l; });
    return desObj;
}

export function objValsList(obj) {
  return Object.values(obj);
}

