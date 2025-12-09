const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

module.exports = function(req, res, next){
  const auth = req.headers.authorization;
  if(!auth) return res.status(401).json({ message: 'No auth' });
  const parts = auth.split(' ');
  if(parts.length !== 2) return res.status(401).json({ message: 'Invalid auth format' });
  const token = parts[1];
  try{
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  }catch(e){
    res.status(401).json({ message: 'Invalid token' });
  }
}
