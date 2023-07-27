import React from 'react'
import Styles from './button.module.css'
import Link from 'next/link'

const Button = ({text,url}) => {
  return (
    <Link href={url}>
        <button className={Styles.container}>{text}</button>
    </Link>
  )
}

export default Button