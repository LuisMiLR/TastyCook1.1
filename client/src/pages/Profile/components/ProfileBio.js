import { useState, useEffect } from "react";
import styles from "./ProfileBio.module.scss";
import { getUserInfo } from "../../../api/auth";

function ProfileBio() {
  const [user, setUser] = useState(null);
  const [coverPic, setCoverPic] = useState("https://via.placeholder.com/150");
  const [profilPic, setProfilPic] = useState("https://via.placeholder.com/150");
  const [website, setWebsite] = useState("https://example.com");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserInfo(token)
        .then((res) => {
          setUser(res);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, []);

  const handleCoverPicChange = (event) => {
    setCoverPic(event.target.value);
  };

  const handleProfilPicChange = (event) => {
    setProfilPic(event.target.value);
  };

  const handleWebsiteChange = (event) => {
    setWebsite(event.target.value);
  };

  return (
    <div className={`${styles.list} d-flex justify-content-center flex-column`}>
      <h2 className="d-flex ">Ma Bio</h2>
      <div className="d-flex flex-column my">
        <label htmlFor="username">Username:</label>
        <div className="d-flex">
          <span>{user != null && user.username}</span>
        </div>
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="coverPic">Cover Picture:</label>
        <div className="d-flex">
          <input
            type="text"
            id="coverPic"
            value={coverPic}
            onChange={handleCoverPicChange}
          />
          <button>Edit</button>
        </div>
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="profilPic">Profile Picture:</label>
        <div className="d-flex">
          <input
            type="text"
            id="profilPic"
            value={profilPic}
            onChange={handleProfilPicChange}
          />
          <button>Edit</button>
        </div>
      </div>
      <div className="d-flex flex-column">
        <label htmlFor="website">Website:</label>
        <div className="d-flex">
          <input
            type="text"
            id="website"
            value={website}
            onChange={handleWebsiteChange}
          />
          <button>Edit</button>
        </div>
      </div>
    </div>
  );
}

export default ProfileBio;
