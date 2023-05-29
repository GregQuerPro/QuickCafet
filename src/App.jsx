import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { supabase } from './external/supabase/supabaseClient'
import './App.css'
import Header from './components/Header/Header.jsx'
import Sidebar from './components/Sidebar/Sidebar.jsx'
import Restaurants from './pages/Restaurants/Restaurants.jsx'
import Menus from './pages/Menus/Menus.jsx'
import Categories from './pages/Categories/Categories.jsx'
import RestaurantDetails from './pages/Restaurants/RestaurantDetails';
import MenuDetails from './pages/Menus/MenuDetails';
import CategorieDetails from './pages/Categories/CategorieDetails';

function App() {

  const [restaurantData, setRestaurantData] = useState(null);
  const [menuData, setMenuData] = useState(null);
  const [categorieData, setCategorieData] = useState(null);

  useEffect(() => {
    async function getRestaurants() {

      let { data, error } = await supabase
        .from('restaurant')
        .select('*');

      if (error) {
        console.warn(error)
      } else if (data) {
        setRestaurantData(data);
      }
    }
    
    async function getMenus() {

      let { data, error } = await supabase
        .from('menu')
        .select('*');

      if (error) {
        console.warn(error)
      } else if (data) {
        setMenuData(data);
      }
    }
    
    async function getCategories() {

      let { data, error } = await supabase
        .from('category')
        .select('*');

      if (error) {
        console.warn(error)
      } else if (data) {
        setCategorieData(data);
      }
    }

    async function getSidebar() {
      getRestaurants()
      getMenus()
      getCategories()
    }

    getSidebar()

  }, [])

  return (
    <>
    <Router>
      <Header/>
      <Sidebar restaurants={restaurantData} menus={menuData} categories={categorieData}/>
      <Routes>
        <Route path="/restaurants/:id" element={<RestaurantDetails />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/menus/:id" element={<MenuDetails />} />
        <Route path="/menus" element={<Menus />} />
        <Route path="/categories/:id" element={<CategorieDetails />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
