import styles from "./ProfileMesRecettes.module.scss";

function ProfileMesRecettes() {
  return (
    <div className={`${styles.list} d-flex flex-column`}>
      <h2 className="text-center">Mes Recettes</h2>
    </div>
  );
}

export default ProfileMesRecettes;
