import { useState, useEffect } from 'react';
import { supabase } from '../../external/supabase/supabaseClient';
import './Restaurants.css'
import Button from '../../components/Buttons/Button'

function Restaurants () {

    const [restaurants, setRestaurants] = useState(null)

    useEffect(() => {
        async function getAllRestaurants () {
          let { data, error } = await supabase
            .from('restaurant')
            .select('*');
    
          if (error) {
            console.warn(error)
          } 

          setRestaurants(data)
          
        }
    
        getAllRestaurants()
      }, [])

    
    return (
        <>
            <div className="content">
                <h1>Restaurants</h1>
                <Button />
                <div className='list'>
                    {restaurants && restaurants.map((restaurant) => (
                        <div className='list__item' key={restaurant.id}>{restaurant.name}</div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Restaurants