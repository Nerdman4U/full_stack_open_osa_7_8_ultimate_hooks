import { useState, useEffect } from 'react'

export const useResource = (baseUrl) => {
  const [ token, setToken ] = useState(null)
  const [ resources, setResources ] = useState([])

  const makeToken = newToken => {
    setToken(`Bearer ${newToken}`)
  }

  const create = async (newObject) => {
    if (!token) {
      console.error('no token')
      return
    }
    console.log('newObject:', newObject)
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      method: 'POST',
      body: JSON.stringify(newObject)
    }

    return fetch(baseUrl, config)
      .then(response => response.json())
      .then(data => {
        setResources(resources.concat(data))
      })
  }

  const update = async (id, newObject) => {
    if (!token) {
      console.error('no token')
      return
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      },
      method: 'PUT',
      body: JSON.stringify(newObject),
    }
    const response = await fetch.put(`{baseUrl}/${id}`, config)
    return response.data
  }

  useEffect(() => {
    fetch(baseUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setResources(data)
      })

  }, [baseUrl])

  const service = {
    create,
    update,
    makeToken
  }

  return [ resources, service ]

}

