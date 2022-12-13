export const get = async (url) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    },
    credentials: 'include'
  }
  const res = await fetch('http://localhost:8000/' + url, options)
  return await res.json()
}

export const post = async (url, data) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data),
    credentials: 'include'
  }
  const res = await fetch('http://localhost:8000/' + url, options)
  return await res.json()
}

export const put = async (url, data) => {
  const options = {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(data),
    credentials: 'include'
  }
  const res = await fetch('http://localhost:8000/' + url, options)
  return await res.json()
}

export const del = async (url) => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json'
    },
    credentials: 'include'
  }
  const res = await fetch('http://localhost:8000/' + url, options)
  return await res.json()
}