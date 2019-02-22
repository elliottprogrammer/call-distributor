// middleware to check user role
module.exports = (roles) => { 
    return (req, res, next) => {
        if(!req.user) res.status(403).send('forbidden');                                     
        else {                                                                                 
            if(roles.length == 0)                                                               
            next();                                                                            
            else if(roles.includes(req.user.role))                                                  
            next();                                                                           
            else                                                                                
            res.status(403).send('forbidden');                                                
        }
    }
}