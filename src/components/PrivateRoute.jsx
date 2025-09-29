import { useState, useEffect } from "react"
import { Navigate, Outlet } from "react-router-dom"
import firebase from "../services/Firebase"

export const PrivateRoute = () => {
  const [loading, setLoading] = useState(true)
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    const unsub = firebase.auth().onAuthStateChanged(user => {
      setAuthed(!!user)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  if (loading) return <div>Carregando...</div>
  return authed ? <Outlet/> : <Navigate to="/" replace/>
}