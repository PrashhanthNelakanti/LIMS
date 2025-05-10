import { useEffect, useState } from "react"

export default function Render() {
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
  
    useEffect(() => {
      setLoading(true)
      fetch('api/personalnfo')
        .then((res) => res.json())
        .then((data) => {
          setData(data)
          setLoading(true)
        })
    }, [])
  
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>
  
    return (
      <div>
        <h1>test</h1>
        <p>wow</p>
      </div>
    )
  }