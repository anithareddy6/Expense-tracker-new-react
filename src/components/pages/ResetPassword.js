import React, {Fragment, useRef, useState} from 'react'
import "./SignUp.css";

const ResetPassword = () => {
    let fetchEmailRef = useRef();
    const [loading, setLoading] = useState(false)
 
    const resetPasswordHandler = (e) => {
        e.preventDefault();
        let enteredEmail = fetchEmailRef.current.value;
        setLoading(true)
         

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAM-FMLCdFPehJSAWmYVXb2tJKYdnjYHvc', {
            method: 'POST',
            body: JSON.stringify({
              requestType: "PASSWORD_RESET",  
              email: enteredEmail,
          }),
          headers:{ 
            'Content-Type': 'application/json'
         }
          })
          .then( res => {
            setLoading(false)
            if(res.ok) {
              res.json().then(data => console.log(data))    
              alert('Reset Link Sent')
            } else {
              return res.json().then(data => {
                alert(data.error.message);
              });
            }
          }
          )
    }
  
  return (
   <form className="contact-form" onSubmit={resetPasswordHandler}>
    <h1>Reset Password 👇</h1>
    <div>
        <label htmlFor="email">Enter The Registered Email</label><br/>
        <input type='email' id='email' placeholder="Enter Your Email" ref={fetchEmailRef}/>
    </div>
   {!loading && <button type='submit'>Send Link</button> }
   {loading && <p>Sending Link Please Wait....</p>}
   </form>
   
  );
};
export default ResetPassword;