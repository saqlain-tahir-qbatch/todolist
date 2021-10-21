import React, {useState}from 'react'
import PropTypes from 'prop-types'

const SignUp = (props)=> {
     const [state, setState] =useState({  name:"" , email: "" , password: ""})
     const handleSubmit =() =>{
         
     }
    return (
        <div>
             <p> This is SignUp Page </p> 
             <form>
                <lable> Name </lable>
                <input type="text" value={state.name} onChange= {event => setState({name:event.target.value}) } />
                <lable> Email </lable>
                <input type="text" value={state.email} onChange= {event => setState({email:event.target.value})} />
                <lable> Password </lable>
                <input type="text" value={state.password} onChange= {event => setState({password:event.target.value})} />

                <button type='submit' onClick={handleSubmit}></button>
            </form>
        </div>
    )
}

SignUp.propTypes = {

}

export default SignUp


