import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    async function fetchTimeline() {
      const response = await fetch("http://localhost:3000/timeline")
      const json = await response.json()
      setPhotos(json)
    }

    fetchTimeline()
  }, [])

  return (
    <div className="timeline">
      {
        !photos.length ? (
          <p>No one posted photos yet</p>
        ) : (
          <div>
            {photos.map(p => <p>{p.filename}</p>)}
          </div>
        )
      }
    </div>
  )
}

export default App
