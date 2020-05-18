import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

function HomePage() {
  return (
    <>
      <h1>Song Guesser</h1>
      <Link to="/game"><Button type="primary">Start Game</Button></Link>
    </>
  )
}

export default HomePage
