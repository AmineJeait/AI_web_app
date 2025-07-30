import { useSelector, useDispatch } from 'react-redux';
import { loginAsStaff, loginAsUser, logout } from './features/user/userSlice';


function PrivateRoute({children}){
    const { role, isAuthenticated } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    return(
        <div>

        </div>
    );
}



export default PrivateRoute;