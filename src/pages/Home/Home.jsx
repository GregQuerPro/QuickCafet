import { useState, useEffect } from 'react';
import { supabase } from '../../external/supabase/supabaseClient';
import './Home.css'

function Home () {

    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])

    useEffect(() => {
        async function getCategoriesByRestaurant(id) {
            
          const { data, error } = await supabase
          .from('restaurant')
          .select(`
            category (
                id,
              name
            )
          `)
          .eq('id', id)
          .single();
          
          setCategories(data.category)
          getProductsByCategory(data.category[0])
    
        }

        async function getProductsByCategory(category) {
            const { data, error } = await supabase
            .from('product')
            .select(`*`)
            .eq('category_id', 57);

            setProducts(data)
        }
    
        getCategoriesByRestaurant(1)
      }, [])

    return (
        <>
            <div className='front__bloc'>
                <div className='home'>
                    <h1>Menu</h1>
                </div>

                <div className='categories__ctn'>
                    {categories.length > 0 && categories.map(category => (
                        <div key={category.id}>{category.name}</div>
                    ))}
                </div>
                <div className='products__ctn'>
                    {products.length > 0 && products.map(product => (
                        <div key={product.id}>
                            <div>{product.name}</div>
                            <img src="" alt="" />
                        </div>
                       
                    ))}
                </div>
            </div>
        </>
    )

}

export default Home