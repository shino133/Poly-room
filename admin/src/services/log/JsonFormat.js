
export const JsonFormat = (data , replace = null , key = 2) => {
  return JSON.stringify(data, replace, key);
}