import React from 'react'
import './cards.css'
import { arr } from '../../data/imgArray'
const ClassCard = ({  title, description }) => {
  const idx=Math.floor(Math.random() * arr.length)
  return (
    <div className="card">
    <img src={arr[idx]} alt={title} className="card-img" />
    <div className="card-body">
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
    </div>
  </div>
  )
}

export default ClassCard