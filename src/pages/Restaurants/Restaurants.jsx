import { useState, useEffect } from 'react';
import { supabase } from '../../external/supabase/supabaseClient';
import './Restaurants.css'
import Button from '../../components/Buttons/Button'
import Listitem from '../../components/Lists/Listitem';

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
              <div className='restaurants__top'>
                <h1>Restaurants</h1>
                <Button />
              </div>
                <div className='list'>
                    {restaurants && restaurants.map((restaurant) => (
                      <Listitem item={restaurant} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Restaurants