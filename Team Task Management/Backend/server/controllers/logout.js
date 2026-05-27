export const logoutRoute=(req, res)=>{
    res.clearCookie('refreshToken');
    res.status(200).json({message:'Logged out successfully'})
}