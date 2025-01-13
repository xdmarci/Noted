import { useNavigate } from "react-router-dom";

import "./profile.css";

const Profile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const editProfile = (user, email, password) => {
    event.preventDefault();
    fetch("http://localhost:3000/updateuser", {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-access-token": localStorage.getItem("token"),
      }),
      body: JSON.stringify({
        Email: email,
        Jelszo: password,
        FelhasznaloNev: user,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert(data.success);
          console.log(data.success);
          navigate("/home");
        } else {
          alert(data.error);
          console.log(data.error);
        }
      });
  };

  const renderContent = () => {
    return (
      <div className="container">
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
          <button
            onClick={(event) => (
              event.preventDefault(),
              editProfile(
                document.getElementById("username").value,
                document.getElementById("email").value,
                document.getElementById("password").value
              )
            )}
          >
            Változtatások mentése
          </button>
          <button onClick={handleLogout}>Kijelentkezés</button>
        </form>
      </div>
    );
  };

  return renderContent();
};

export default Profile;
