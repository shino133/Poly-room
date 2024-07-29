
export const JsonFormat = (data , replace = null , key = 2) => {
  return <pre>{JSON.stringify(data, replace, key)}</pre>;
}