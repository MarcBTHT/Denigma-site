import { useState } from 'react'
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';



function Page1() {

  return (
    <>
        <h1>Page 1</h1>
        <Link to="/page2">Page 2</Link>
      
    </>
  )
}

export default Page1
