import React from 'react'
import classnames from 'classnames'
import styles from './index.module.css'

export default function Input({name, type, placeholder, error, onChange, value}) {

  const className = classnames(styles.input, {
    [styles.error]: !!error
  });

  return (
    <input className={className} name={name} type={type} placeholder={placeholder} onChange={onChange} value={value}/>
  )
}
