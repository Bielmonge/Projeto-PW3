import { useAuth } from '../contexts/AuthContext';  // Certifique-se de importar o hook useAuth
import { auth } from "../firebase/config";

function MainPage() {
  const { user } = useAuth(); // Obter o usuário do contexto de autenticação

  const handleSignOut = () => {
    auth.signOut();
  }

  return (
    <div>
      <h1>Página Principal</h1>

      Bem-vinde! Sucesso.
      {user.displayName && <p>Nome: {user.displayName}</p>}

      {user.photoURL && <img src={user.photoURL} alt="Foto de Perfil" />}

      <button onClick={handleSignOut}>Sair</button>
    </div>
  );
}

export default MainPage;
