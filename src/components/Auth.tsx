import { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';

export default function Auth() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <label htmlFor="email">Email </label>
      <input
        id="email"
        type="text"
        placeholder="Email..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <label htmlFor="password">Password </label>
      <input
        id="password"
        type="password"
        placeholder="Password..."
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={signIn}>Sign In</button>
      <button onClick={logout}>Log out</button>
    </div>
  );
}
