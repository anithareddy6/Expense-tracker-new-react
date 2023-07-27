import React, {Fragment, useRef, useEffect, useState} from 'react'
import { NavLink, useHistory } from "react-router-dom";
import "./SignUp.css";
// import AuthContext from '../Store/auth-context';

const UpdateProfile = () => {
    let fetchNameRef = useRef();
    let fetchPhotoRef = useRef();
 
    const history = useHistory();

     const [displayName, setName] =useState('')
     const [imageURL, setUrl] = useState('')

    const updateFormHandler = (e) => {
        e.preventDefault();
        let enteredName = fetchNameRef.current.value;
        let enteredPhoto = fetchPhotoRef.current.value;
         
if(enteredName && enteredPhoto) {
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAy-Q3CCQlOjp5fk423K0K8MU5GThmLG7k', {
            method: 'POST',
            body: JSON.stringify({
              idToken: localStorage.getItem('token'),
              displayName: enteredName,
              photoUrl: enteredPhoto,
              returnSecureToken: true
          }),
          headers:{ 
            'Content-Type': 'application/json'
         }
          })
          .then( res => {
            if(res.ok) {
                console.log(res.json());
                // history.replace('/home')
              console.log('Updated!!')
            } else {
              return res.json().then(data => {
                alert(data.error.message);
              });
            }
          }
          )
        }
      else {
          alert ('Please Fill All The Details')
        }
    }

    useEffect(() => {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAy-Q3CCQlOjp5fk423K0K8MU5GThmLG7k', {
        method: 'POST',
        body: JSON.stringify({
        idToken: localStorage.getItem('token')
        }),
        headers:{ 
          'Content-Type': 'application/json'
       }
      })
      .then(res => {
          return res.json();
      }).then(
        (data) => {setName(data.users[0].displayName);
          setUrl(data.users[0].photoUrl)
        }
      )

    }, [])

    const verifyEmailHandler = () => {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAy-Q3CCQlOjp5fk423K0K8MU5GThmLG7k', {
          method: 'POST',
          body: JSON.stringify({
              requestType: "VERIFY_EMAIL",
              idToken: localStorage.getItem('token')
          }),
          headers:{ 
              'Content-Type': 'application/json'
           }
      })
      .then((res) => {
          if(res.ok) {
          res.json().then(data => alert('Verification Link Sent'))
          } else {
              res.json().then(data => {
                  alert(data.error.message);
                });
          }
      })
  }
  
  return (
   <form className="contact-form" onSubmit={updateFormHandler}>
    <h1>Update Your Profile 👇</h1>
    <div>
        <label htmlFor="name">Full Name</label><br/>
        <input type='text' id='name' placeholder="Enter Your Full Name" defaultValue={displayName} ref={fetchNameRef}/>
    </div>
    <div>
        <label htmlFor="photo">Profile Photo URL</label><br/>
        <input type='text' id='photo' placeholder="Enter Your URL" defaultValue={imageURL} ref={fetchPhotoRef}/>
    </div>
   
    <button onClick={verifyEmailHandler}>Verify Email</button>
    <button type='submit'>Update Profile</button>
   </form>
   
  );
};
export default UpdateProfile;