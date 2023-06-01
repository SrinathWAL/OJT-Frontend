//Import the neccessary libraries 
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom'
import { useDispatch ,useSelector } from 'react-redux'
import { userLogin } from '../slices/loginSlice';
import { useEffect } from 'react'
import dash from './images/dash.svg'

export default function Login() {
  //Using react-hook-form to create Login form.
  const { register, handleSubmit, formState: { errors } } = useForm();
  //Access the state 
  let {status,errorMessage}=useSelector(state=>state.login)
  //Navigate from one page to another
  const navigate=useNavigate()
  const dispatch=useDispatch()

  useEffect(()=>{
    if(status === "success" ){
      navigate('/dashboard')
    }
  })

  const onSubmit=async(userObj)=>{
    dispatch(userLogin(userObj))
  }

  //Create Form for user Login.
  return (
    <div className='row'>
      <div className='col'>
      <img src={dash} alt='IMG' width='600' height='300'></img>
      </div>
      <div className='col'>
        <p className='display-5 text-dark justify-content-left'>LOGIN</p>
        {errorMessage && <p className='text-danger'>{errorMessage}</p>}
        <div className='row mx-auto'>
          <div className='col-10 col-sm-8 col-md-6 shadow'>
            <form >
                <div className='mt-4'>
                    <label htmlFor="user_email" className='mb-2'>Email</label>
                    <input type="text" {...register('user_email',{required:true})} id='email' className='form-control'/>
                    {/*Validation of fields*/}
                    {errors.user_email?.type==='required' && <p className='text-danger'>Email required*</p>}
                </div>
                <div className='mt-3'>
                    <label htmlFor="password" className='mb-2'>Password</label>
                    <input type="password" {...register('user_password',{required:true})} id='password' className='form-control'/>
                    {errors.user_password?.type==='required' && <p className='text-danger'>Password required*</p>}
                </div>
                <button type='submit' className='btn btn-dark btn-rounded float-end  mt-4 mb-3' onClick={handleSubmit(onSubmit)}>Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
