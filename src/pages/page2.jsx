import { useState } from 'react'
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function Page2() {

  return (
    <>
        <h1>Page 2</h1>
        <Link to="/page3">Page 3</Link>
    </>
  )
}

export default Page2
