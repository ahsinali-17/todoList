import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar(props) {
  return (
    <div className='bg-slate-900 flex justify-between p-2'>
     <div className='logo mx-2 cursor-pointer'>
     <Link to="/"><span className='font-bold italic text-xl font-serif text-white'><span className='text-red-700'>i</span>TASK</span></Link>
</div>
<div className='flex gap-10 text-red-600'>
<Link className='cursor-pointer hover:text-gray-200 hover:font-bold transition-all'to="/" >Home</Link>
<Link className='cursor-pointer hover:text-gray-200 hover:font-bold transition-all' to='/history'>History</Link>
</div>
    </div>
  )
}
 