import React, { useState } from 'react'
// import { inputStatus } from '../../constants'

export default ({onInput}) => {
  const [inputName, updateinputName] = useState('');
  // const status = inputStatus
  (inputName?.length > 2 || inputName?.length === 0) &&
    (
      onInput({
        jobName: inputName
        // status: status.inprogress
      })
    )
  return (
    <>
      <h2 className="title">Get jobs listing</h2>
      <form className={"form__q1"} onSubmit={(e)=>{e.preventDefault()}}>
        <label></label>
        <input className="form__q1--input" type="text" value={inputName}
          onChange={(e) => updateinputName(e.currentTarget.value)} placeholder="Input job name" />
      </form>
    </>
  )
}
