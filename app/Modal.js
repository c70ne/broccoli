'use client'

import styles from './Home.module.css'
import { useState } from 'react'
import axios from 'axios'

export default function Modal() {

  // hardcoded example URI endpoint.
  const URI = 'https://us-central1-blinkapp-684c1.cloudfunctions.net/fakeAuth'

  // state for determining if modal is displayed. 
  const [openModal, setOpenModal] = useState(false)

  // state for housing form data prior to being submitted.
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    confirm: '' 
  })

  // state for assisting to validate email format.
  const [invalidEmail, setInvalidEmail] = useState(false)

  // state for updating loading status for axios request.
  const [isLoading, setIsLoading] = useState(false)

  // state for storing the HTTP status code.
  const [status, setStatus] = useState({ code: '', message: '' })

  // function for assisting to validate email format.
  function isValidEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,10})+$/.test(email)
  }

  // event handler that updates formData state.
  function inputHandler(event) {
    
    // desctructure required event.target properties.
    const { name, value } = event.target

    if (name == 'email' && !isValidEmail(value)) {
      setInvalidEmail(true)
    } else setInvalidEmail(false)

    // reset status state to remove message from displaying.
    if (
      name == 'email' && status.message || 
      name == 'confirm' && status.message
    ) {
        setStatus({code: '', message: ''})
    }

    // pass data from inputs to setFormData state.
    setFormData({ 
      ...formData, 
      [name]: value
    })
  }

  // artificial loading state to display loading message on submit button.
  function submitHandler() {
    setIsLoading(true)
    setTimeout(() => {
      requestHandler(URI, { name: formData.name, email: formData.email })
    }, 1000)
  }

  // handles that passes arguments to an axios post request.
  function requestHandler(endpoint, object) {
    axios.post(endpoint, object)
    // resolves promise to state upon successful request.
    .then(function (response) {
      if (response) {
        setStatus({ code: response.status, message: response.data })
      }
    })
    // resolves promise to state upon unsuccessful request.
    .catch(function (error) {
      if (error.response) {
        setStatus({ 
          code: error.response.status, 
          message: error.response.data.errorMessage
        })
        setIsLoading(false)
      } 
    })
  }

  // reset states to their initial values following request success.
  function ok() {
    setOpenModal(false)
    setFormData({ name: '', email: '', confirm: '' })
    setIsLoading(false)
    setStatus({ code: '', message: '' })
  }

  return (
    <>
      <button 
        className={styles.request_btn} 
        onClick={() => setOpenModal(true)}
      >
        Request an invite
      </button>
      {openModal ? (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            {status.code != 200 ?
              <div className={styles.inputs}>
                <h3 className={styles.modal_title}>Request an invite</h3>
                <hr style={{ width: '20%' }} />
                <input 
                  type='text'
                  placeholder='Full name'
                  className={styles.name} 
                  name='name'
                  value={formData.name}
                  onChange={inputHandler}
                />
                <p 
                  className={styles.requirements}
                  style={{ 
                    visibility: formData.name.length > 0 && 
                    formData.name.length < 3 ? 'visible' : 'hidden'
                  }}
                >
                  * Requires at least 3 characters.
                </p>
                <input 
                  type='email'
                  placeholder='Email' 
                  className={styles.email}
                  name='email'
                  value={formData.email}
                  onChange={inputHandler}
                />
                <p 
                  className={styles.requirements}
                  style={{ 
                    visibility: formData.email != '' && 
                    invalidEmail ? 'visible' : 'hidden'
                  }}
                >
                  * Invalid email address format.
                </p>
                <input 
                  type='email'
                  placeholder='Confirm email'
                  className={styles.confirm} 
                  name='confirm'
                  value={formData.confirm}
                  onChange={inputHandler}
                />
                <p 
                  className={styles.requirements}
                  style={{ 
                    visibility: formData.confirm == '' || 
                    formData.email == formData.confirm? 'hidden' : 'visible'
                  }}
                >
                  * Email addresses must match.
                </p>
                <p 
                  className={styles.requirements}
                  style={{ 
                    visibility: status.message == '' ? 'hidden' : 'visible'
                  }}
                >
                  * {status.message}
                </p>
                <button 
                  className={styles.submit_btn}
                  disabled={
                    formData.name.length > 3 && 
                    formData.email &&
                    isValidEmail &&
                    formData.email == formData.confirm ? false : true
                  }
                  onClick={submitHandler}
                >
                  {!isLoading ? 'Submit' : 'Loading...'}
                </button>
                <button 
                  className={styles.cancel_btn} 
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </button>
              </div> : 
              <div>
                <h3 className={styles.modal_title}>All done!</h3>
                <hr style={{ width: '20%' }} />
                <p className={styles.modal_body}>
                  You will be one of the first to exerience Broccoli
                  & Co. when we launch.
                </p>
                <button 
                  className={styles.ok_btn}
                  onClick={() => ok()}
                >
                  OK
                </button>
              </div>
            }
          </div>
        </div>
      ) : null}
    </>
  )
}