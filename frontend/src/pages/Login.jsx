import React, {useState} from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [form, setForm] = useState({ email:'', password:'' });
  const [msg, setMsg] = useState('');
  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try{
      const res = await API.post('/auth/login', form);
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('name', user.name || '');
      setMsg('Login successful');
      nav('/');
    }catch(e){
      setMsg('Failed to login: ' + (e?.response?.data?.message || e.message));
    }
  };
  return (<div>
    <h2>Login</h2>
    <form onSubmit={submit} className="card form">
      <label>Email<input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required/></label>
      <label>Password<input type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required/></label>
      <div style={{display:'flex', gap:8}}>
        <button className="btn" type="submit">Login</button>
      </div>
      {msg && <p className="muted">{msg}</p>}
    </form>
  </div>);
}
