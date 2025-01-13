
import { useNavigate } from 'react-router-dom';


import "./profile.css";

const Profile = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/');
      };


    const renderContent = () => {
        return (
            <div className='container'>
                
                <form>
                <h2>Profil szerkeztése</h2>
                    <div>
                        <label htmlFor="username">Felhasználónév:</label>
                        <input type="text" id="username" name="username" />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" />
                    </div>
                    <div>
                        <label htmlFor="password">Jelszó:</label>
                        <input type="password" id="password" name="password" />
                    </div>
                    <button type="submit">Változtatások mentése</button>
                    <button onClick={handleLogout}>Logout</button>
                </form>
                
            </div>
        )
    };

    return renderContent();
};





export default Profile;