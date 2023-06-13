import { useEffect, useState } from 'react';
import Button from '../../components/Buttons/Button';
import Listitem from '../../components/Lists/Listitem';

import { supabase } from '../../external/supabase/supabaseClient';
import './Categories.css'

function Categories () {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function getAllCategories () {
          let { data, error } = await supabase
            .from('category')
            .select('*');
    
          if (error) {
            console.warn(error)
          } 

          setCategories(data)
          
        }
    
        getAllCategories()
      }, [])

    return (
        <>
            <div className="content">
                <div className="categories__top">
                    <h1>Catégories</h1>
                    <Button />
                </div>
                <div className='list'>
                    {categories && categories.map((category) => (
                        <Listitem item={category} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Categories;