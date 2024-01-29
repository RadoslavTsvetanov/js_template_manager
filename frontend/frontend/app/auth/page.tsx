import Form from '@/components/form'
import React from 'react'

const Signup = () => {
  const inputData = [
    { label: 'Name', name: 'name' },
    { label: 'Email', type: 'email', name: 'email' },
    { label: 'Password', type: 'password', name: 'password' },
  ];

  return (
    <Form button_text='Submit' input_data_arr={inputData}/>
  )
}

export default Signup