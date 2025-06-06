import axios from "axios";
import { createContext, useEffect, useState } from "react"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState("{}");
    const url = "https://petpuja-backend-ww2v.onrender.com"
    const [token, setToken] = useState("")
    const [food_list, setFood_list]=useState([])


    const fetchAdmin = async () => {
        const response = await axios.post(url + "/api/user/register");
        setFood_list(response.data.data)
    }
    const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = async () => {
      setIsVisible(false);
  };

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } })
        setCartItems(response.data.cartData);
    }

    useEffect(() => {
        async function loadData() {
            await fetchAdmin();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData(); 
    },[])


    const contextValue = {
        fetchAdmin,
        cartItems,
        isVisible,
        setIsVisible,
        toggleVisibility,
        setCartItems,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider
