import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/auth/authOperations';
import { Link } from 'react-router-dom';
import { MdAppRegistration} from 'react-icons/md';
import{ReactComponent as LogoClose} from './X.svg'
import{ReactComponent as LogoWatch} from './Watch.svg'
import{ReactComponent as LogoNoWatch} from './Nowatch.svg'
import { selectError } from 'redux/auth/authSelectors';
import {
  Tytle,
  Container,
  Form,
  FormLabel,
  FormInput,
  FormBtn,
  SvgClose,
  SvgCloseEmail,
  SvgWatch,
} from './RegisterForm.styled';
import { useState } from 'react';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectError)
  const [regEmail,setRegEmail]=useState('');
  const [regUserName,setRegUserName]=useState('');
  const [regPassword,setRegPassword]=useState('');
  const [flagWatch,setFlagWatch]=useState(false)
  const handleSubmit = e => {
    e.preventDefault();
    const Form = e.currentTarget;

    dispatch(
      register({
        name: Form.elements.name.value,
        email: Form.elements.email.value,
        password: Form.elements.password.value,
      })
    );
    if( error===null){
      setRegUserName('')
      setRegEmail('')
      setRegPassword('')
    }
  };
  const handleChange = (e)=>{
    const {name,value}=e.currentTarget;
     if(name==='name'){
     setRegUserName(value)
     }
    else if(name==='email'){
    setRegEmail(value)
  }
    else {
      setRegPassword(value)
    }

  }

  return (
    <>
      <Tytle>Register new user</Tytle>

      <Container>
        <Form onSubmit={handleSubmit} autoComplete="off">
          <FormLabel>
            Username:
            <FormInput type="text" name="name" onChange={handleChange} value={regUserName}/>
          </FormLabel>
         <SvgClose onClick={()=>{setRegUserName('')}} >{regUserName && <LogoClose/>}</SvgClose>
          <FormLabel>
            E-mail:
            <FormInput type="email" name="email" onChange={handleChange} value={regEmail}/>
          </FormLabel>
          <SvgCloseEmail onClick={()=>{setRegEmail('')}}>{regEmail && <LogoClose/>}</SvgCloseEmail>
          <FormLabel>
            Password:
            <FormInput type={flagWatch ? 'text':'password'} name="password" onChange={handleChange} value={regPassword} />
          </FormLabel>
          <SvgWatch onClick={()=>{setFlagWatch(!flagWatch)}}>{!flagWatch ?<LogoWatch/>:<LogoNoWatch/>}</SvgWatch>
          <FormBtn type="submit">
            <MdAppRegistration />
            Register
          </FormBtn>
        </Form>

        <p>
          <Link to="/login">Log In</Link> if you already have an account.
        </p>
      </Container>
    </>
  );
};

export default RegisterForm;
