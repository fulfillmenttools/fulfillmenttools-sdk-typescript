export function buildQueryFromArray(paramName: string, arrayToBuildFrom: string[], maxSize?: number): string {
  if (arrayToBuildFrom.length <= 0) {
    throw new Error('Tried to work with an unsupported array size.');
  }

  if (maxSize && maxSize >= 1) {
    arrayToBuildFrom = arrayToBuildFrom.slice(0, maxSize - 1);
  }

  if (arrayToBuildFrom.length > 1) {
    let query = `${arrayToBuildFrom[0]}&${paramName}`;
    arrayToBuildFrom = arrayToBuildFrom.slice(1);
    query += arrayToBuildFrom.join(`&${paramName}=`);

    return query;
  } else {
    return arrayToBuildFrom[0];
  }
}
