
import { useNavigate } from 'react-router-dom';


import "./profile.css";

const Profile = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/');
      };

    const editProfile = (user, email, password) => {
        fetch('http://localhost:3000/updateuser', {
            method:'PUT',headers: new Headers(
                {"Content-Type": "application/json",
                    "Accept": "application/json",
                    "x-access-token":localStorage.getItem('token')}
            ),
            body:JSON.stringify({
                "Email":email,
                "Password":password,
                "Username":user})
        }).then(response => response.json())
          .then(data => {
            if (data.success) {
                alert(data.succes)
                console.log(data.succes)
                navigate('/home');
            }
            else {
                alert(data.error)
                console.log(data.error)
                
            }
            

          })
        

        navigate('/home');

     }


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
                    <button type="submit" onClick={() => (editProfile(
                        document.getElementById('username').value,
                        document.getElementById('email').value,
                        document.getElementById('password').value
                    ))} >Változtatások mentése</button>
                    <button onClick={handleLogout}>Logout</button>
                </form>
                
            </div>
        )
    };

    return renderContent();
};





export default Profile;