import React,{useState,useEffect} from 'react';
import {connect } from 'react-redux';
import {setAlert} from '../actions/alert';
import PropTypes from 'prop-types';
import Alert from '../components/layout/Alert';
import {register} from '../actions/auth'; 
import Swal from 'sweetalert2'
import { Modal, Button, OverlayTrigger, Tooltip,FormControl } from 'react-bootstrap';
  const SignUp = ({setAlert,register,isAuthenticated}) => {


    
    const [formData, setFormData] = useState({
      username: "",
      email: "",
      password: "",
      confirmPassword: ""
    })

    const [errors, setErrors] = useState({
      usernameErrors: "",
      emailErrors: "",
      passwordErrors: "",
      confirmPasswordErrors: ""
    })
    const [personalShow, setPersonalShow] = useState(false);
       const showPersonal = () => setPersonalShow(true);
       const handlePersonalClose = () => {
        setPersonalShow(false);
      };
    const {username,email,password,confirmPassword}=formData;
    //const navigate = useNavigate();
    const handleSubmit=async (e)=> {
      e.preventDefault();
      
      if(formData.password!==formData.confirmPassword)
      setAlert('Password do not match','danger');
      // else{
      //   //register({username,email,mobile,password,confirmPassword});
      // }
      console.log(formData);
      console.log(errors);
      if (errors.usernameErrors === "" && errors.passwordErrors === "" && errors.emailErrors === "" && errors.confirmPasswordErrors === ""){
        register({username,email,password});
        if(isAuthenticated){
        handlePersonalClose();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registration successful',
          showConfirmButton: false,
          timer: 1500
        })
      }
      }
      
      if(isAuthenticated)
      handlePersonalClose();
        // try{
        //   const config={
        //     headers:{
        //       'Content-Type':'application/json'
  
        //     }}
        //     const body=JSON.stringify(formData);
        //     const res=await axios.post('http://localhost:5000/api/users',body,config).then(response => {
        //       if (!response.ok) {
        //         throw new Error(response.statusText);
        //       }
        //       handlePersonalClose();
        //       localStorage.setItem('token',res.data);
        //       return response.data;
        //     })
        //     .then(data => {
        //       console.log("fjdlkfdjfkldjfkljdkfj");
        //       // handlePersonalClose();
        //       // localStorage.setItem('token',res.data);
        //       // // console.log(localStorage.getItem('token'));
        //       // alert("success")
        //       // handle success data
        //       //navigate("/Login");
        //     })
        //     .catch(error => {
        //       // handle error
        //       alert(error);
        //       //setErrors({ ...errors, emailErrors: "**email is already in use" });
  
        //     });
        //     console.log(res.data);
        // }
        // catch(err){
        //   //console.error(err.response.data);
        // }
      // axios.post('http://localhost:2001/users',formData).then(resp => {
      // console.log(resp.data);
  // }).catch(error => {
      // console.log(error);
  // });
      
  
    }
      const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
       
    //   useEffect(() => {
    //     handlePersonalClose();
    //   }, [formData]);
          function handlePersonalSubmit(e){
        
        handlePersonalClose();
         }
    return(<>
    <OverlayTrigger
                    overlay={
                        <Tooltip id={`tooltip-top`}>
                        
                        </Tooltip>
                    }>
                
                <button className="btn bg-green-500" onClick={showPersonal}>Sign Up</button>
                </OverlayTrigger>
                <Modal animation={false} show={personalShow} onHide={handlePersonalClose}>
                <Modal.Header className="bg-green-500 text-black-500" closeButton style={{ position: 'relative' }}>
  <Modal.Title>Sign Up</Modal.Title>
  <Button
    style={{ position: 'absolute', top: 0, right: 0, zIndex: 999,color:'black' }}
    variant="primary"
    onClick={handlePersonalClose}
  >
    x
  </Button>
</Modal.Header>
        <Modal.Body>
        <section>
     
            <form
              onSubmit={handleSubmit}
               className="form">
            {/* {formStep>0 &&<button onClick={goToPreviousState} type="button"><i className="fas fa-chevron-left"></i></button>} */}
             {/* <p>Step {formStep+1} of 3</p> */}
             <Alert/>
                  <div className="field">
                  <label className="label" htmlFor="username">Username</label>
                  <div className="control has-icons-left has-icons-right">
                    <FormControl
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      className="input"
                      onChange={(event)=>{
                        setFormData({...formData,username:event.target.value})
                      }}
                  
                      // onChange={(event) => {
                      //   setFormData({ ...formData, username: event.target.value })
                      //   if (event.target.value === "") {
                      //     //setFormData({ ...formData, password: event.target.value })
                      //     setErrors({ ...errors, usernameErrors: "**username cannot be empty" })
                      //   }
                      //   else if (event.target.value.length < 3) {
                      //     setErrors({ ...errors, usernameErrors: "**username should be at least 3 characters long" })
                      //   }
                      //   else {
                      //     setErrors({ ...errors, usernameErrors: "" })
                      //   }
                      // }
                    
                    />
                    <span className="icon is-small is-left"><i className="fas fa-user"></i></span>
                    </div>
                    {/* <label htmlFor="" className="emailErrorLabel"><small className="errorLabel">{errors.usernameErrors}</small></label> */}
                    
                  </div>

                  <div className="field">
                  <label className="label" htmlFor="email">Email</label>
                  <div className="control has-icons-left has-icons-right">
                    <FormControl
                      type="text"
                      id="email"
                      name="email"
                      value={formData.email}
                      className="input"
                      onChange={(event) => {
                        setFormData({ ...formData, email: event.target.value })
                        // var regex = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-zA-z]{2,3}$");
                        // if (event.target.value === "") {
                        //   //setFormData({ ...formData, password: event.target.value })
                        //   setErrors({ ...errors, emailErrors: "**email cannot be empty" })
                        // }
                        // else if (!regex.test(event.target.value)) {
                        //   setErrors({ ...errors, emailErrors: "**invalid email" })
                        // }
                        // else {
                        //   setErrors({ ...errors, emailErrors: "" })
                        // }
                      }}
                    />
                    <span className="icon is-small is-left"><i className="fas fa-envelope"></i></span>
                    </div>
                    {/* <small className="errorLabel">{errors.emailErrors}</small> */}
                    {/* <label htmlFor="" className="emailErrorLabel"></label> */}
                  </div>

                  {/* <div className="field">
                  <label className="label" htmlFor="mobile">Mobile Number</label>
                  <div className="control has-icons-left has-icons-right">
                    <input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      value={formData.mobile}
                      className="input"
                      onChange={(event) => {
                        setFormData({ ...formData, mobile: event.target.value })
                        var mobileRegex = new RegExp("^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$");
                        //Made by Gaurav jalkote
                        if (event.target.value === "") {
                          //setFormData({ ...formData, password: event.target.value })
                          setErrors({ ...errors, mobileErrors: "**mobile cannot be empty" })
                        }
                        else if (!mobileRegex.test(event.target.value)) {
                          setErrors({ ...errors, mobileErrors: "**invalid mobile number" })
                        }
                        else {
                          setErrors({ ...errors, mobileErrors: "" })
                        }
                      }}
                    />
                    <span className="icon is-small is-left"><i className="fas fa-mobile"></i></span>
                    </div>
                    <small className="errorLabel">{errors.mobileErrors}</small>
                  
                  </div> */}

                  <div className="form-group">
                  <label className="label" htmlFor="password">Password</label>
                  <div className="control has-icons-left has-icons-right">
                    <FormControl
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={(event) => {
                        setFormData({ ...formData, password: event.target.value })
                        // if (event.target.value === "") {
                        //   //setFormData({ ...formData, password: event.target.value })
                        //   setErrors({ ...errors, passwordErrors: "**password cannot be empty" })//Gaurav
                        // }
                        // else if (event.target.value.length < 3) {
                        //   setErrors({ ...errors, passwordErrors: "**password should be at least 3 characters long" })
                        // }
                        // else {
                        //   setErrors({ ...errors, passwordErrors: "" })
                        // }
                      }
                    }
                    />
                    <span className="icon is-small is-left"><i className="fas fa-key"></i></span>
                    </div>
                    {/* <small className="errorLabel">{errors.passwordErrors}</small> */}
                    {/* <label htmlFor="" className="emailErrorLabel"></label> */}
                  </div>

                  <div className="form-group">
                  <label className="label" htmlFor="confirmPassword">Confirm Password</label>
                  <div className="control has-icons-left has-icons-right">
                    <FormControl
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      className="input"
                      onChange={(event) => {
                        setFormData({ ...formData, confirmPassword: event.target.value })
                        // if (event.target.value === "") {
                        //   //setFormData({ ...formData, password: event.target.value })
                        //   setErrors({ ...errors, confirmPasswordErrors: "**confirmPassword cannot be empty" })//GJ
                        // }
                        // else if (event.target.value !== formData.password) {
                        //   setErrors({ ...errors, confirmPasswordErrors: "**confirmPassword should match with password" })
                        // }
                        // else {
                        //   setErrors({ ...errors, confirmPasswordErrors: "" })
                        // }
                      }}
                    />
                    <span className="icon is-small is-left"><i className="fas fa-key"></i></span>
                    </div>
                    {/* <small className="errorLabel">{errors.confirmPasswordErrors}</small> */}
                    {/* <label htmlFor="" className="emailErrorLabel"></label> */}
                  </div>


                {/*<section>
                  <h2 className="font-semibold text-3xl mb-8">Personal Information</h2>
                  <div className="container ">
                    <div className="field">
                      <label className="label" htmlFor="firstName">First Name</label>
                      <div className="control has-icons-left has-icons-right">
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          className="input"
                          onChange={(event) => {
                            setFormData({ ...formData, firstName: event.target.value })
                            if (event.target.value === "") {
                              //setFormData({ ...formData, firstName: event.target.value })
                              setErrors({ ...errors, firstNameErrors: "**firstName cannot be empty" })
                            }
                            else {
                              setErrors({ ...errors, firstNameErrors: "" })
                            }
                          }}
                        />
                        <span className="icon is-small is-left"><i className="fas fa-user"></i></span>
                      </div>
                      <small className="errorLabel">{errors.firstNameErrors}</small>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor="Last Name">Last Name</label>
                      <div className="control has-icons-left has-icons-right">
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          className="input"
                          onChange={(event) => {
                            setFormData({ ...formData, lastName: event.target.value })
                            if (event.target.value === "") {
                              //setFormData({ ...formData, firstName: event.target.value })
                              setErrors({ ...errors, lastNameErrors: "**lastName cannot be empty" })
                            }
                            else {
                              setErrors({ ...errors, lastNameErrors: "" })
                            }
                          }}
                        />
                        <span className="icon is-small is-left"><i className="fas fa-user"></i></span>
                      </div>
                      <small className="errorLabel">{errors.lastNameErrors}</small>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor="location">location</label>
                      <div className="control has-icons-left has-icons-right">
                        <input
                          type="text"
                          id="location"
                          name="location"
                          value={formData.location}
                          className="input"
                          onChange={(event) => {
                            setFormData({ ...formData, location: event.target.value })
                            if (event.target.value === "") {
                              //setFormData({ ...formData, password: event.target.value })
                              setErrors({ ...errors, locationErrors: "**location cannot be empty" })
                            }
                            else {
                              setErrors({ ...errors, locationErrors: "" })
                            }
                          }}
                        />
                        <span className="icon is-small is-left"><i className="fas fa-home"></i></span>
                      </div>
                      <small className="errorLabel">{errors.locationErrors}</small>
                    </div>
                    <div className="field">
                      <label className="label">Date of Birth</label>
                      <div className="control has-icons-left has-icons-right">
                        <input
                          type="date"
                          id="dob"
                          name="dob"
                          value={formData.dob}
                          className="input"
                          onChange={(event) => {
                            setFormData({ ...formData, dob: event.target.value })
                            if (event.target.value === "") {
                              //setFormData({ ...formData, dob: event.target.value })
                              setErrors({ ...errors, dobErrors: "**dob cannot be empty" })
                            }
                            else {
                              setErrors({ ...errors, dobErrors: "" })
                            }
                          }}
                        />
                        <span className="icon is-small is-left"><i className="fas fa-birthday-cake"></i></span>
                      </div>
                      <small className="errorLabel">{errors.dobErrors}</small>
                    </div>
                  </div>
                </section>)}
              {formStep === 2 && (
                <section>
                  <h2 className="font-semibold text-3xl mb-8">Resume Builder</h2>
                  <section >
                    <h4>Academic details</h4>
                    <div className="row">
                      <div className="container col-md-4">
                        <label className="label" htmlFor="mobile">College/University</label>
                        <div className="field">
                          <input
                            type="text"
                            id="college"
                            name="college"
                            className="input"
                            onChange={(event) => {
                              setFormData({ ...formData, academic: { ...formData.academic, college: { ...formData.academic.college, name: event.target.value } } })
                            }}
                          />
                        </div>
                      </div>
                    
                      <div className="container col-md-4">
                        <label className="label" htmlFor="passingYear">Passing Year</label>
                        <div className="field">
                          <input
                            type="month"
                            id="passingYear"
                            name="passingYear"
                            className="input"
                            onChange={(event) => {
                              setFormData({ ...formData, academic: { ...formData.academic, college: { ...formData.academic.college, passingYear: event.target.value } } })
                            }}
                          />
                        </div>
                      </div>
                      <div className="container col-md-4">
                        <label className="label" htmlFor="qualification">Qualification</label>
                        <div className="field">
                          <input
                            type="text"
                            id="qualification"
                            name="qualification"
                            className="input"
                            onChange={(event) => {
                              setFormData({ ...formData, academic: { ...formData.academic, college: { ...formData.academic.college, qualification: event.target.value } } })
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="container col-md-4">
                        <label className="label" htmlFor="school">School</label>
                        <div className="field">
                          <input
                            type="text"
                            id="school"
                            name="school"
                            className="input"
                            onChange={(event) => {
                              setFormData({ ...formData, academic: { ...formData.academic, school: { ...formData.academic.school, name: event.target.value } } })
                            }}
                          />
                        </div>
                      </div>
                      
                      <div className="container col-md-4">
                        <label className="label" htmlFor="passingYear">Passing Year</label>
                        <div className="field">
                          <input
                            type="month"
                            id="passingYear"
                            name="passingYear"
                            className="input"
                            onChange={(event) => {
                              setFormData({ ...formData, academic: { ...formData.academic, school: { ...formData.academic.school, passingYear: event.target.value } } })
                            }}
                          />
                        </div>
                      </div>
                      <div className="container col-md-4">
                        <label className="label" htmlFor="qualification">Qualification</label>
                        <div className="field">
                          <input
                            type="text"
                            id="qualification"
                            name="qualification"
                            className="input"
                            onChange={(event) => {
                              setFormData({ ...formData, academic: { ...formData.academic, school: { ...formData.academic.school, qualification: event.target.value } } })
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </section>
                   <section>
                    <h4>Project</h4>
                    <div>
                      <label className="label" htmlFor="projectTitle">Title</label>
                      <div className="field">
                        <input
                          type="text"
                          id="projectTitle"
                          name="projectTitle"
                          className="input"
                          onChange={(event) => {
                            setFormData({ ...formData, project: { ...formData.project, title: event.target.value } })
                          }}
                        />
                      </div>
                      <label className="label" htmlFor="projectDeatils">Project Details</label>
                      <div className="field">
                        <textarea
                          type="text"
                          id="projectDetails"
                          name="projectDetails"
                          className="input"
                          onChange={(event) => {
                            setFormData({ ...formData, project: { ...formData.project, details: event.target.value } })
                          }}
                        />
                      </div>
                    </div>
                  </section> 
                   <section>
                    <h4>Work Experience</h4>
                    <div className="row">
                      <div className="col-md-5">
                        <label className="label" htmlFor="company">Company Name</label>
                        <div className="field">
                          <input
                            type="text"
                            id="company"
                            name="company"
                            className="input"
                            onChange={(event) => {
                              setFormData({ ...formData, experience: { ...formData.experience, companyName: event.target.value } })
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-5">
                        <label className="label" htmlFor="role">Role</label>
                        <div className="field">
                          <input
                            type="text"
                            id="role"
                            name="role"
                            className="input"
                            onChange={(event) => {
                              setFormData({ ...formData, experience: { ...formData.experience, role: event.target.value } })
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-5">
                        <label className="label" htmlFor="joiningDate">Joining Date</label>
                        <div className="field">
                          <input
                            type="month"
                            id="joinDate"
                            name="joinDate"
                            className="input"
                            onChange={(event) => {
                              setFormData({ ...formData, experience: { ...formData.experience, joinDate: event.target.value } })
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-5">
                        <label className="label" htmlFor="endDate">End Date</label>
                        <div className="field">
                          <input
                            type="month"
                            id="endDate"
                            name="endDate"
                            className="input"
                            onChange={(event) => {
                              setFormData({ ...formData, experience: { ...formData.experience, endDate: event.target.value } })
                            }}
                          />
                        </div>
                      </div>
                      <label className="label" htmlFor="experienceDetails">Details</label>
                      <div className="field">
                        <textarea
                          type="text"
                          id="experienceDetails"
                          name="experienceDetails"
                          className="input"
                          onChange={(event) => {
                            setFormData({ ...formData, experience: { ...formData.experience, details: event.target.value } })
                          }}
                        />
                      </div>
                    </div>
                  </section> 
                </section>)}*/}

              {/* {renderButton()} */}
              <br></br>
              <input type="submit" value="Sign Up"  className="bg-green-500 btn shadow" />
            {/* <p className="redirect">
            Already a user? <Link to="/login" style={{color:'lightseagreen'}}>Log In</Link> Here.
            </p> */}

            </form>
    </section>
            {/* <EditForm theEmployee={employee} /> */}
        </Modal.Body>
        {/* <Modal.Footer>
                <Button variant="secondary" onClick={handlePersonalClose}>
                    Close
                </Button>
        </Modal.Footer> */}
    </Modal>
    </>)
}
  
SignUp.propTypes={
  setAlert:PropTypes.func.isRequired,
  register:PropTypes.func.isRequired,
  isAuthenticated:PropTypes.bool
}
const mapStateToProps=state=>({
  isAuthenticated:state.auth.isAuthenticated
});

export default connect(mapStateToProps,{setAlert,register}) (SignUp);