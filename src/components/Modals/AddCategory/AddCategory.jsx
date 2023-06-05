import './AddCategory.css'
import { supabase } from '../../../external/supabase/supabaseClient'
import { useState } from 'react'
import Input from '../../Form/Input'

function AddCategory ({categories, setCategories, setDisplayAddModal}) {

  // console.log(categories);

    const [name, setName] = useState('')


    const addCategory = async (e) => {
      e.preventDefault()
      setCategories([...categories, {name:name}])
      setName('')
    }

    return (
        <>
          <div className="modal__add_category">
            <div>
              <div className='modal__add_top'>
                <h3>Ajout catégorie</h3>
                <button className='modal__close' onClick={() => setDisplayAddModal(false)}>X</button>
              </div>
              <div className='modal__add_body'>
                <form onSubmit={addCategory}>
                    <p>
                    <label htmlFor="name" className='input__label'>Nom Catégorie</label><br />
                    <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="input__text"/>
                    </p>
                    <p>
                    <button type="submit" className='btn__add_category'>Ajouter une catégorie</button>
                    </p>
                </form>
              </div>
            </div>
            <div>
              
            </div>
          </div>
        </>
    )
}

export default AddCategory