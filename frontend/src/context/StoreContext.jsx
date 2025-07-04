import axios from "axios";
import { food_list } from "../assets/assets"
import { createContext, useEffect, useState } from "react"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItems, setCartItems] = useState("{}");
    const [iteminfo, setIteminfo] = useState([])
    const url = "https://petpuja-backend-ww2v.onrender.com"
    const [token, setToken] = useState("")
    const [food_list, setFood_list]=useState([])

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
        if (token) {
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFood_list(response.data.data)
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;  
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let iteminfo = []
                food_list.map((data, index) => {
                    if (data._id === item) {
                        totalAmount += data.price * cartItems[item];
                    }
                })
            }
        }
        return totalAmount;
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } })
        setCartItems(response.data.cartData);
    }

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])


    const contextValue = {
        food_list,
        setFood_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
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
