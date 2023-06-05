import './AddProduct.css'
import { useState } from 'react'
import { supabase } from '../../../external/supabase/supabaseClient'
import Input from '../../Form/Input'

function AddProduct ({category, setDisplayAddModal}) {


    const [product, setProduct] = useState({
        name: '',
        description: '',
        image: ''
    })
    const [imageFile, setImageFile] = useState(null);


    const [ingredients, setIngredients] = useState([])
    const [variations, setVariations] = useState([])
    const [extras, setExtras] = useState([])

    const [isDragging, setIsDragging] = useState(false);

    const handleDragEnter = (event) => {
        event.preventDefault();
        setIsDragging(true);
      };
    
      const handleDragLeave = (event) => {
        event.preventDefault();
        setIsDragging(false);
      };
    
      const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);
        const file = event.dataTransfer.files[0];
        setProduct({
          ...product,
          image: file.name,
        });
        setImageFile(file);
      };
    
      const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        setProduct({
          ...product,
          image: file.name,
        });
        setImageFile(file);
      };



    const handleAddProduct = async (e) => {

      e.preventDefault();
      console.log(category);

      let { data, error } = await supabase
        .from('category')
        .select('*')
        .eq('name', category)
        .single();

      const category_id = data.id

      console.log(product);

      // const { product, ProductError } = await supabase
      //         .from('product')
      //         .insert()

      // if (imageFile) {
      //   const { data, error } = await supabase.storage
      //     .from('quickcafet')
      //     .upload(`restaurants/${imageFile.name}`, imageFile, {
      //       cacheControl: '3600',
      //       upsert: false
      //     });
  
      //   if (error) {
      //     console.error('Erreur lors de l\'enregistrement de l\'image :', error.message);
      //   }
  
      //   getRestaurantImageUrl(imageFile.name)
  
      }
      
      /*
      ////////////////////////////////////////////////////////// Ingrédients ////////////////////////////////////////////////////////////
      */
     
     const handleAddIngredient = (event) => {
       if (event.key === 'Enter') {
         event.preventDefault();
         const ingredient = event.target.value
         setIngredients([...ingredients, ingredient])
         event.target.value = '';
        }
    }
    
    const handleDeleteIngredient = (index) => {
      const updatedIngredients = [...ingredients];
      updatedIngredients.splice(index, 1);
      setIngredients(updatedIngredients);
    };
    
    /*
    ////////////////////////////////////////////////////////// Variations ////////////////////////////////////////////////////////////
    */
   
   const handleAddVariation = (event) => {
     if (event.key === 'Enter') {
       event.preventDefault();
       const variation = {
         name: event.target.value,
         options: []
        }
        setVariations([...variations, variation])
        event.target.value = '';
      }
    }
    
    const handleDeleteVariations = (index) => {
      const updatedVariations = [...variations];
      updatedVariations.splice(index, 1);
      setVariations(updatedVariations);
    };
    
    const handleAddOption = (event, index) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const option = {
          name: event.target.value,
          price: 0
        }
        
        const updatedVariations = [...variations];
        updatedVariations[index].options.push(option);
        
        setVariations(updatedVariations);
        
        event.target.value = '';
      }
    }
    
    const handleOptionPriceChange = (event, variationIndex, optionIndex) => {
      const updatedVariations = [...variations];
      updatedVariations[variationIndex].options[optionIndex].price = event.target.value;
      setVariations(updatedVariations);
    };
    
    
    
    
    /*
    ////////////////////////////////////////////////////////// Extras ////////////////////////////////////////////////////////////
    */
   
   
   const handleAddExtra = (event) => {
     if (event.key === 'Enter') {
       event.preventDefault();
       const extra = {
         name: event.target.value,
         options: []
        }
        setExtras([...extras, extra])
        event.target.value = '';
      }
    }
    
    const handleAddExtraOption = (event, index) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        const option = {
          name: event.target.value,
          price: 0
        }
        
        const updatedExtras = [...extras];
        updatedExtras[index].options.push(option);
        
        setExtras(updatedExtras);
        
        event.target.value = '';
      }
    }
    
    const handleDeleteExtras = (index) => {
      const updatedExtras = [...extras];
      updatedExtras.splice(index, 1);
      setExtras(updatedExtras);
    };
    
    const handleExtraOptionPriceChange = (event, extraIndex, optionIndex) => {
      const updatedExtras = [...extras];
      updatedExtras[extraIndex].options[optionIndex].price = event.target.value;
      setExtras(updatedExtras);
    };
    
    console.log(extras);
    
    
    return (
      <>
            <div className="modal__add_product">
            <div>
              <div className='modal__add_top'>
                <h3>Ajout {category}</h3>
                <button className='modal__close' onClick={() => setDisplayAddModal(false)}>X</button>
              </div>
              <div className='modal__add_body'>
                <form onSubmit={handleAddProduct}>
                    <p>
                        <label htmlFor="name" className='input__label'>Nom</label><br />
                        <input type="text" id="name" name="name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} className="input__text"/>
                    </p>
                    <p>
                        <label htmlFor="description" className='input__label'>Description</label><br />
                        <textarea name="description" id="description" cols="50" rows="10" onChange={(e) => setProduct({ ...product, description: e.target.value })} value={product.description} className="input__textarea"></textarea>
                    </p>
                    <div>
                      <label htmlFor="image">Image</label><br />
                      <div
                        className={`file-input ${isDragging ? 'dragging' : ''}`}
                        onDragEnter={handleDragEnter}
                        onDragOver={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        >
                    <label htmlFor="file-input" className="file-label">
                        Sélectionnez un fichier ou faites-le glisser ici
                    </label>
                    <input
                        type="file"
                        id="file-input"
                        className="file-input"
                        accept="image/*"
                        onChange={handleFileInputChange}
                        />
                      </div>
                    </div>
                    <div className='ingredients'>
                      <label htmlFor="ingredients" className='input__label'>Ingrédients</label><br />
                      <input type="text" onKeyDown={handleAddIngredient} className="input__text" placeholder='Ajoutez un ingrédient'/>
                      <div className='ingredients__ctn'>
                        {ingredients.length > 0 && (
                          ingredients.map((ingredient, index) => (
                            <div key={index} className="ingredient__item">
                              {ingredient}
                              <div
                                className="ingredient__delete"
                                onClick={() => handleDeleteIngredient(index)}
                                >
                                X
                              </div>
                            </div>
                          ))
                          )}
                      </div>
                    </div>
                    <div>
                        <label htmlFor="variations" className='input__label'>Variations</label><br />
                        <input type="text" onKeyDown={handleAddVariation} className="input__text" placeholder='Ajoutez une variation'/>
                        <div className='variations__ctn'>
                          {variations.length > 0 && (
                            variations.map((variation, a) => (
                              <div key={a} className="variations__item">
                                <h3 className='variations__name'>
                                  {variation.name}
                                </h3>
                                <div
                                  className="variations__delete"
                                  onClick={() => handleDeleteVariations(a)}
                                  >
                                  X
                                </div>
                                <div>
                                  <input type="text" onKeyDown={(e) => handleAddOption(e, a)} className="input__text input__text--white" placeholder='Ajoutez une option'/>
                                  {variation.options.length > 0 && (
                                    <div className='variation__options'>
                                      {variation.options.map((option, optionIndex) => (
                                        <div key={optionIndex} className="option__item">
                                          <div>{option.name}</div>
                                          <div className='price__ctn'>
                                            <input type="text" name='option__price' id='option__price' value={option.price} onChange={(e) => handleOptionPriceChange(e, a, optionIndex)} className="input__number"/>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))
                            )}
                        </div>
                      </div>
                      <div className='extra'>
                        <label htmlFor="extras" className='input__label'>Extras</label><br />
                        <input type="text" onKeyDown={handleAddExtra} className="input__text" placeholder='Ajoutez un extra'/>
                        <div className='extras__ctn'>
                          {extras.length > 0 && (
                              extras.map((extra, a) => (
                                <div key={a} className="variations__item">
                                  <h3 className='variations__name'>
                                    {extra.name}
                                  </h3>
                                  <div
                                    className="variations__delete"
                                    onClick={() => handleDeleteExtras(a)}
                                    >
                                    X
                                  </div>
                                  <div>
                                    <input type="text" onKeyDown={(e) => handleAddExtraOption(e, a)} className="input__text input__text--white" placeholder='Ajoutez une option'/>
                                    {extra.options.length > 0 && (
                                      <div className='variation__options'>
                                        {extra.options.map((option, optionIndex) => (
                                          <div key={optionIndex} className="option__item">
                                            <div>{option.name}</div>
                                            <div className='price__ctn'>
                                              <input type="text" name='option__price' id='option__price' value={option.price} onChange={(e) => handleExtraOptionPriceChange(e, a, optionIndex)} className="input__number"/>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))
                              )}
                        <div/>
                      </div>
                    </div>
                    <p>
                    <button type="submit" className='btn__add_category'>Ajouter {category}</button>
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
  
  export default AddProduct