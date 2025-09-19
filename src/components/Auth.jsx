import React, { useState } from 'react'
import {
  auth,
  googleProvider,
  signInWithPopup,
  fbSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from '../firebase'


export default function Auth({ user, setUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState('')


  async function handleGoogleSignIn() {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      setUser(result.user)
    } catch (e) {
      setError(e.message)
    }
  }


  async function handleEmailSubmit(e) {
    e.preventDefault()
    try {
      let res
      if (isLogin) {
        res = await signInWithEmailAndPassword(auth, email, password)
      } else {
        res = await createUserWithEmailAndPassword(auth, email, password)
      }
      setUser(res.user)
    } catch (e) {
      setError(e.message)
    }
  }


  async function logout() {
    await fbSignOut(auth)
    setUser(null)
  }


  if (user) return (
    <div className="p-4">
      <p className="mb-2">Signed in as <strong>{user.email || user.displayName}</strong></p>
      <button onClick={logout} className="px-4 py-2 rounded bg-gray-200">Sign out</button>
    </div>
  )


  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl mb-4">Sign {isLogin ? 'in' : 'up'}</h2>
      {error && <div className="mb-2 text-red-600">{error}</div>}
      <form onSubmit={handleEmailSubmit} className="space-y-2">
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 border rounded" />
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" className="w-full p-2 border rounded" />
        <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded">{isLogin ? 'Sign in' : 'Create account'}</button>
      </form>
      <div className="mt-3 text-center">
        <button onClick={() => setIsLogin(!isLogin)} className="underline">{isLogin ? "Don't have an account? Sign up" : 'Already have account? Sign in'}</button>
      </div>
      <div className="mt-4">
        <button onClick={handleGoogleSignIn} className="w-full p-2 border rounded">Continue with Google</button>
      </div>
    </div>
  )
}