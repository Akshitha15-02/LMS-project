import React, {useState} from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const [msg, setMsg] = useState('');
  const nav = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    try{
      const res = await API.post('/auth/register', form);
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('name', user.name || '');
      setMsg('Registered and logged in');
      nav('/');
    }catch(e){
      setMsg('Failed to register: ' + (e?.response?.data?.message || e.message));
    }
  };
  return (<div>
    <h2>Register</h2>
    <form onSubmit={submit} className="card form">
      <label>Name<input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required/></label>
      <label>Email<input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required/></label>
      <label>Password<input type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} required/></label>
      <div style={{display:'flex', gap:8}}>
        <button className="btn" type="submit">Register</button>
      </div>
      {msg && <p className="muted">{msg}</p>}
    </form>
  </div>);
}
