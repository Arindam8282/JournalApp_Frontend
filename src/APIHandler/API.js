const API = ({
  uri = '/',
  type = "GET",
  withCredential = false,
  body = null,
  onSuccess = (res)=>{console.log(res)},
  onFail = (error)=>{console.log(error)}
}) => {
  let auth = withCredential ? {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzY2NmQxMjMyMmIwNWI2MmQzMDQzN2QiLCJlbWFpbCI6ImRhcmluZGFtNTA3QGdtYWlsLmNvbSIsImlhdCI6MTY2Nzk1Mzg4OSwiZXhwIjoxNjcwNTQ1ODg5fQ.0Uh0zXczzofijpifNkJBPop3v_2W6hwjomhAuDBWaBE'} : {}
  let data = body? {
    body: JSON.stringify({
      "userId":"63666d12322b05b62d30437d",
      ...body})
  } : ''
  console.log(data)
  fetch(process.env.REACT_APP_BACKEND_URL+uri,{
    headers:{
      'Accept':'application/json',
      'Content-Type': 'application/json',
      ...auth
    },
    method: type,
    ...data
  })
  .then((res)=> res.json())
  .then(onSuccess)
  .catch(onFail)
}
export default API;