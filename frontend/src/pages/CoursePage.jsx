import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';

export default function CoursePage(){
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  useEffect(()=> {
    API.get('/courses/' + id).then(r=> setCourse(r.data)).catch(()=>{});
  },[id]);
  if(!course) return <div>Loading...</div>;
  return (<div>
    <h2>{course.title}</h2>
    <p className="muted">By {course.instructor} • ₹{course.price}</p>
    <div className="video-wrap">
      {course.videoUrl ? <video controls src={course.videoUrl} style={{maxWidth:'100%'}} /> : <div className="placeholder">No video URL — set Cloudinary/S3 URL in course</div>}
    </div>
    <p>{course.description}</p>
    <div style={{marginTop:16}}>
      <a className="btn" href={`/api/cert/generate/${course._id}`} target="_blank" rel="noreferrer">Download Certificate (requires login)</a>
    </div>
  </div>);
}
