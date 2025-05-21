import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const HomePage = () => {
  const { isCheckingAuth,authUser,checkAuth } = useAuthStore()
  return (
    <div>
      homepage
    </div>
  )
}

export default HomePage
