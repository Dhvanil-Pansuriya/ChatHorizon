import React from 'react'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <main className='text-white'>
        Home
        <section>
          <Outlet/>
        </section>
    </main>
  )
}

export default Home
