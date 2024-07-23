import { useDispatch } from 'react-redux'
import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess
} from '../redux/user/userSlice'

const useSignOut = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSignOut = useCallback(async () => {
    try {
      dispatch(signOutUserStart())
      const res = await fetch('/api/auth/signout')
      const data = await res.json()

      if (data.success === false) {
        dispatch(signOutUserFailure(data.message))
        return
      }

      dispatch(signOutUserSuccess(data))
      navigate('/sign-in')
    } catch (error) {
      dispatch(signOutUserFailure(error.message))
    }
  }, [dispatch, navigate])

  useEffect(() => {
    const handlePopstate = event => {
      // Prevent navigation when pressing the back button on the keyboard
      if (event.type === 'popstate') {
        navigate('/') // Navigate to the home page
      }
    }
    window.addEventListener('popstate', handlePopstate)

    return () => {
      window.removeEventListener('popstate', handlePopstate)
    }
  }, [navigate])

  return { handleSignOut }
}

export default useSignOut
