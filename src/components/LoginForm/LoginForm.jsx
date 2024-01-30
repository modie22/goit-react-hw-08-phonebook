import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/authOperations';
import { Link } from 'react-router-dom';
import { MdOutlineLogin } from 'react-icons/md';
import {
  Tytle,
  Container,
  Form,
  FormLabel,
  FormInput,
  FormBtn,
  SvgCloseEmail,
  SvgWatch,
} from './LoginForm.styled';
import { useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectError } from 'redux/auth/authSelectors';
import{ReactComponent as LogoClose} from '.././RegisterForm/X.svg'
import{ReactComponent as LogoWatch} from '.././RegisterForm/Watch.svg'
import{ReactComponent as LogoNoWatch} from '.././RegisterForm/Nowatch.svg'

const LoginForm = () => {
  const dispatch = useDispatch();
  const [logPassword,setLogPassword]=useState('');
  const [logEmail,setLogEmail]=useState('');
  const [flagWatch,setFlagWatch]=useState(false)
  const error = useSelector(selectError);
  console.log(error);
  const handleSubmit = e => {
    e.preventDefault();
    const Form = e.currentTarget;
    dispatch(
      logIn({
        email: Form.elements.email.value,
        password: Form.elements.password.value,
      })
    );
    if(error===null){
    setLogEmail('')
    setLogPassword('')
    }
  };
  const handleChange = (e)=>{
    const {name,value}=e.currentTarget;

    if(name==='email'){
    setLogEmail(value)
  }
    else {
      setLogPassword(value)
    }
  }

  return (
    <>
      <Tytle>Log In</Tytle>

      <Container>
        <Form onSubmit={handleSubmit} autoComplete="off">
          <FormLabel>
            E-mail:
            <FormInput type="email" name="email" onChange={handleChange} value={logEmail}/>
          </FormLabel>
          <SvgCloseEmail onClick={()=>{setLogEmail('')}}>{logEmail && <LogoClose/>}</SvgCloseEmail>
          <FormLabel>
            Password:
            <FormInput type={flagWatch ? 'text':'password'} name="password" onChange={handleChange} value={logPassword} />
          </FormLabel>
          <SvgWatch onClick={()=>{setFlagWatch(!flagWatch)}}>{!flagWatch ?<LogoWatch/>:<LogoNoWatch/>}</SvgWatch>
          <FormBtn type="submit">
            <MdOutlineLogin />
            Log In
          </FormBtn>
        </Form>

        <p>
          <Link to="/register">Register</Link> if you don't have an account yet.
        </p>
      </Container>
    </>
  );
};

export default LoginForm;
