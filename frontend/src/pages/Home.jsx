import React, {useEffect, useState} from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

export default function Home(){
  const [courses, setCourses] = useState([]);
  useEffect(()=> {
    API.get('/courses').then(r=> setCourses(r.data)).catch(()=>{});
  },[]);
  return (<div>
    <h2>Featured courses</h2>
    <div className="grid">
      {courses.length===0 && <div>No courses yet. Create one!</div>}
      {courses.map(c=> (
        <div className="card" key={c._id}>
          <div className="card-body">
            <h3>{c.title}</h3>
            <p className="muted">{c.instructor}</p>
            <p>{c.description?.slice(0,120)}</p>
            <div className="card-footer">
              <Link to={'/course/'+c._id}>View</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>);
}
