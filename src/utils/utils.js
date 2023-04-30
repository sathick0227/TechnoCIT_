export const isValidEmail = (data) => {
  console.log(data)
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  console.log(re.test(data))
  return re.test(data);
}
export const isValidPhone = (data) => {
  const regex = /^[0-9]*$/
  return regex.test(data);
}