import React, {useState} from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function CreateCourse(){
  const [form, setForm] = useState({ title:'', description:'', instructor:'', price:0, videoUrl:'', tags:'' });
  const [msg, setMsg] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try{
      // Ensure token present
      const token = localStorage.getItem('token');
      if(!token){
        setMsg('You must be logged in to create a course. Please login or register.');
        return;
      }
      const payload = {...form, tags: form.tags.split(',').map(s=>s.trim()).filter(Boolean)};
      await API.post('/courses', payload);
      setMsg('Created successfully');
      nav('/');
    }catch(e){
      console.error(e);
      const err = e?.response?.data?.message || e.message;
      setMsg('Failed to create: ' + err);
    }
  };
  return (<div>
    <h2>Create course</h2>
    <form onSubmit={submit} className="card form">
      <label>Title<input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required/></label>
      <label>Instructor<input value={form.instructor} onChange={e=>setForm({...form, instructor:e.target.value})} /></label>
      <label>Video URL (Cloudinary / S3 URL)<input value={form.videoUrl} onChange={e=>setForm({...form, videoUrl:e.target.value})} /></label>
      <label>Price<input type="number" value={form.price} onChange={e=>setForm({...form, price: Number(e.target.value)})} /></label>
      <label>Tags (comma separated)<input value={form.tags} onChange={e=>setForm({...form, tags:e.target.value})} /></label>
      <label>Description<textarea value={form.description} onChange={e=>setForm({...form, description:e.target.value})} /></label>
      <div style={{display:'flex', gap:8}}>
        <button className="btn" type="submit">Create</button>
      </div>
      {msg && <p className="muted">{msg}</p>}
    </form>
  </div>);
}
