import './AddCategory.css'
import { supabase } from '../../../external/supabase/supabaseClient'
import { useState } from 'react'

function AddCategory ({restaurantID}) {

    const [name, setName] = useState('')


    const addCategory = async (e) => {
      e.preventDefault()
      
      const { error } = await supabase
        .from('category')
        .insert({ 
          name: name,
          restaurant_id: restaurantID  
        })
    }

    return (
        <>
          <div className="modal__add_category">
            <h3>Ajout catégorie</h3>
            <form onSubmit={addCategory}>
                <p>
                <label htmlFor="name">Nom Catégorie</label><br />
                <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                </p>
                <p>
                <button type="submit">Ajouter une catégorie</button>
                </p>
            </form>
          </div>
        </>
    )
}

export default AddCategory