
import Chat from './pages/Chat'
import Reset from './pages/Reset'
import PublicRoute from './routes/PublicRoute'
import ProtectedRoute from './routes/ProtectedRoute'
import { useEffect } from 'react'
import storeProfile from './context/storeProfile'
import storeAuth from './context/storeAuth'

function App() {
    const { profile} = storeProfile()
    const { token } = storeAuth()

    useEffect(() => {
    if(token){
        profile()
    }
    }, [token])
    return (
    <>
    <BrowserRouter>
        <Routes>
        
        <Route element={<PublicRoute />}>
            <Route index element={<Home/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>
            <Route path='forgot/:id' element={<Forgot/>}/>
            <Route path='confirm/:token' element={<Confirm/>}/>
            <Route path='reset/:token' element={<Reset/>}/>
            <Route path='*' element={<NotFound />} />
        </Route>


            <Route path='dashboard/*' element={
            <ProtectedRoute>
                <Routes>
                <Route element={<Dashboard />}>
                    <Route index element={<Profile />} />
                    <Route path='listar' element={<List />} />
                    <Route path='visualizar/:id' element={<Details />} />
                    <Route path='crear' element={<Create />} />
                    <Route path='actualizar/:id' element={<Update />} />
                    <Route path='chat' element={<Chat />} />
                </Route>
                </Routes>
            </ProtectedRoute>
            } />


        </Routes>
    </BrowserRouter>
    </>
    )
}

export default App