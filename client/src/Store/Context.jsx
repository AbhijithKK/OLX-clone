import {createContext,useState} from 'react'
export const AuthContext=createContext(null)

export default function Context({children}){
const [user, setUser] = useState({login:false})
const [search, setSearch] = useState('')
const [category, setCategory] = useState('')
const [refresh, setRefresh] = useState(false)

return(
    <AuthContext.Provider value={{user,setUser,search,setSearch,category, setCategory,refresh, setRefresh}}>{children}</AuthContext.Provider>
)

}

