import {auth} from '../firebase/config.js'
import {useState} from 'react';
import {  
         createUserWithEmailAndPassword         ,
         sendPasswordResetEmail,
         signInWithEmailAndPassword,
         signInWithPopup,
         GoogleAuthProvider

 } from "firebase/auth";


function LoginPage() {

    const [loginType, setLoginType] = useState('login');
    const [userCredenciais, setUserCredenciais] = useState({})
    const [error , setError] = useState('')

    const dic_erros = {
        'auth/missing-password': 'Informar senha',
        'auth/weak-password': 'Senha muito fraca, a senha deve ter pelo menos 6 caracteres',
        'auth/email-already-in-use': 'Email já cadastrado',
        'auth/configuration-not-found': 'Autentifique sua conta no Firebase',
        'auth/user-disabled': 'Usuário desativado',
        'auth/user-not-found': 'Usuário não encontrado',
        'auth/wrong-password': 'Senha incorreta',
        'auth/invalid-email': 'Email inválido',
        'auth/email-already-exists': 'Este email já existe no sistema',
        'auth/operation-not-allowed': 'Operação não permitida, consulte a configuração do Firebase',
        'auth/weak-password': 'Senha muito fraca',
        'auth/requires-recent-login': 'É necessário fazer login recentemente para realizar essa ação',
        'auth/too-many-requests': 'Muitas tentativas de login, tente novamente mais tarde',
        'auth/network-request-failed': 'Falha na conexão de rede, tente novamente',
        'auth/invalid-credential': 'Credenciais inválidas',
        'auth/invalid-verification-code': 'Código de verificação inválido',
        'auth/invalid-verification-id': 'ID de verificação inválido',
        'auth/account-exists-with-different-credential': 'Conta já existente com outra credencial',
        'auth/expired-action-code': 'Código de ação expirado',
        'auth/invalid-action-code': 'Código de ação inválido',
        'auth/invalid-api-key': 'Chave de API inválida',
        'auth/user-token-expired': 'Token de usuário expirado, por favor faça login novamente',
        'auth/cancelled-popup-request': 'Requisição de popup cancelada',
        'auth/popup-closed-by-user': 'Popup fechado pelo usuário',
        'auth/timeout': 'O tempo de espera excedeu o limite',
        'auth/invalid-email-password': 'Combinacão de email ou senha inválida',
        'auth/invalid-phone-number': 'Número de telefone inválido',
        'auth/phone-number-already-exists': 'Número de telefone já cadastrado',
        'auth/too-many-phones': 'Muitos números de telefone, tente novamente mais tarde',
        'auth/phone-number-not-found': 'Número de telefone não encontrado',
    };
    

    function handleCred(e){
        setUserCredenciais({...userCredenciais, [e.target.name]: e.target.value})
        //console.log(userCredenciais.email)
    }

    function handleSignUp(e){
        e.preventDefault();
        setError('')

        createUserWithEmailAndPassword(auth, userCredenciais.email, userCredenciais.password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            setError( dic_erros[errorCode] ||errorMessage)
            // ..
        }); 
    }

    function handleSignIn(e){
        e.preventDefault();
        setError('')

        signInWithEmailAndPassword(auth, userCredenciais.email, userCredenciais.password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user)
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)

            setError( errorMessage)

            // ..
        }); 
    }

    function handlePasswordReset(){
        const email = prompt('Informe seu e-mail:')
        sendPasswordResetEmail(auth, email)
    }

    const handleGoogleLogin = async(e) =>{
        e.preventDefault()

        try {
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider) 

            const user = result.user
            console.log (' Google login ok', user)

        } catch(error){
            //const errorCode = error.code;
            console.error('Google login failed:', error);

            const errorMessage = error.message;
            setError( errorMessage)

        }

    }


    return (
        <>
        <div className="container login-page">
          <section>
            <h1>Etec Albert Einstein</h1>
            <p>Entre ou crie uma conta para continuar.</p>
            <div className="login-type">
              <button 
                className={`btn ${loginType == 'login' ? 'selected' : ''}`}
                onClick={()=>setLoginType('login')}>
                  Entrar
              </button>
              <button 
                className={`btn ${loginType == 'signup' ? 'selected' : ''}`}
                onClick={()=>setLoginType('signup')}>
                  Criar Conta
              </button>
            </div>
            <form className="add-form login">
                  <div className="form-control">
                      <label>E-mail *</label>
                      <input onChange={(e)=>{handleCred(e)}}  type="text" name="email" placeholder="Informe seu email" />
                  </div>
                  <div className="form-control">
                      <label>Senha *</label>
                      <input onChange={(e)=>{handleCred(e)}}  type="password" name="password" placeholder="Informe a senha" />
                  </div>
                  {
                    loginType == 'login' ?
                    <button onClick={(e)=>handleSignIn(e)} className="active btn btn-block">Entrar</button>
                    : 
                    <button onClick={(e)=>handleSignUp(e)}  className="active btn btn-block">Criar Conta</button>


                  }

                  {
                    <button onClick={(e)=>handleGoogleLogin(e)}  className="active btn btn-block">Login com Google</button>
                  }

                  {
                    <div className='error'> {error} </div>
                  }
 
                  {

                  }
                  <p  onClick={handlePasswordReset} className="forgot-password">Esqueci minha senha.</p>
                  
              </form>
          </section>
        </div>


        </>
    )
}

export default LoginPage