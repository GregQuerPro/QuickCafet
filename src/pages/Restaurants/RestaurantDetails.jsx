import "./RestaurantDetails.css";
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../../external/supabase/supabaseClient';
import AddCategory from '../../components/Modals/AddCategory/AddCategory';
import CategoryToAdd from '../../components/Modals/CategoryToAdd/CategoryToAdd';
import Tags from '../../components/Tags/Tags';
import Input from '../../components/Form/Input';
import FileInput from "../../components/Form/FileInput/FileInput";
import Products from "../../components/Section/Products/Products";
import AddProduct from "../../components/Modals/AddProduct/AddProduct";

function RestaurantDetails() {
  const { id } = useParams();
  const [restaurantDetails, setRestaurantDetails] = useState({
    id: '',
    address: '',
    name: '',
    image: '',
    created_at: '',
    updated_at: '',
    user_id: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [initialCategories, setInitialCategories] = useState(null)
  const [categories, setCategories] = useState(null)
  const [activeCategory, setActiveCategory] = useState(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [displayAddModal, setDisplayAddModal] = useState(false)
  const [displayAddModalProducts, setDisplayAddModalProducts] = useState(false)
  const date = new Date()

  useEffect(() => {
    async function getRestaurantDetail (id) {
      let { data, error } = await supabase
        .from('restaurant')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.warn(error)
      } else if (data) {
        setRestaurantDetails(data);
      }

      getRestaurantImageUrl(data.image)
      
    }

    async function getCategoriesByRestaurant(id) {
        
      const { data, error } = await supabase
      .from('restaurant')
      .select(`
        category (
          name
        )
      `)
      .eq('id', id)
      .single();
      
      setInitialCategories(data.category)
      setCategories(data.category)

    }

    getRestaurantDetail(id)
    getCategoriesByRestaurant(id)
  }, [id])


  const getRestaurantImageUrl = (imageName) => {
      const url = 'restaurants/' + imageName
      const {data} = supabase
      .storage
      .from('quickcafet')
      .getPublicUrl(url)

      setImageUrl(data.publicUrl)
  }
  
  const handleNameChange = (event) => {
    setRestaurantDetails({
      ...restaurantDetails,
      name: event.target.value,
    });
  };

  const handleAddressChange = (event) => {
    setRestaurantDetails({
      ...restaurantDetails,
      address: event.target.value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setRestaurantDetails({
      ...restaurantDetails,
      image: file.name,
    });
    setImageFile(file);
  };

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
    setRestaurantDetails({
      ...restaurantDetails,
      image: file.name,
    });
    setImageFile(file);
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setRestaurantDetails({
      ...restaurantDetails,
      image: file.name,
    });
    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // console.log(restaurantDetails);

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const formatedDate = date.toISOString();

    try {
      const { data, error } = await supabase
        .from('restaurant')
        .update({
          name: restaurantDetails.name,
          address: restaurantDetails.address,
          image: restaurantDetails.image,
          updated_at: formatedDate,
        })
        .eq('id', restaurantDetails.id);

        getRestaurantImageUrl(imageFile.name)

    } catch (error) {
      console.error(error);
    }

    try {

        const categoriesToAdd = categories.filter((category) => {
          return !initialCategories.some((initialCategory) => category.name === initialCategory.name);
        });

        const categoriesToDelete = initialCategories.filter((InitialCategory) => {
          return !categories.some((category) => InitialCategory.name === category.name);
        });

        if (categoriesToAdd.length >= 1) {
            const categoryData = categoriesToAdd.map((category) => ({
              name: category.name,
              restaurant_id: restaurantDetails.id
            }));
          
            const { category, CategoriesError } = await supabase
              .from('category')
              .insert(categoryData)

            }
            
        if (categoriesToDelete.length >= 1) {
          const categoryDeleteData = categoriesToDelete.map((category) => category.name);

          // console.log(categoryDeleteData);
        
          const { CategoriesDeleteError } = await supabase
            .from('category')
            .delete()
            .in('name', categoryDeleteData)
            .eq('restaurant_id', restaurantDetails.id)

          }

        } catch(CategoriesError) {
          console.error(CategoriesError);
        }



    if (imageFile) {
      const { data, error } = await supabase.storage
        .from('quickcafet')
        .upload(`restaurants/${imageFile.name}`, imageFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Erreur lors de l\'enregistrement de l\'image :', error.message);
      }

      getRestaurantImageUrl(imageFile.name)

    }
  }

  return (
    <>  
      <div className='content'>
        <div>
          <h1>{restaurantDetails && restaurantDetails.name}</h1>
          {/* <p>{restaurantDetails && restaurantDetails.address}</p>
          <p>{restaurantDetails && restaurantDetails.image}</p> */}
        </div>
        <div>
          <img src={imageUrl} alt="" width="200px"/>
        </div>
        <form onSubmit={handleSubmitForm}>
          <div className='form__row'>
          <Input
              label="Nom"
              value={restaurantDetails.name}
              onChange={handleNameChange}
            />
            <Input
              label="Adresse"
              value={restaurantDetails.address}
              onChange={handleAddressChange}
            />
          </div>
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
          {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" width="200px" />}
          </div>
        </div>

          <p>
            <button type="submit" className="btn__save">Sauvegarder</button>
          </p>
        </form>

        <div>
          <button className="btn__add_category" onClick={() => setDisplayAddModal(true)}>Ajout catégorie</button>
          <div className="tagsCtn">
            {categories && categories.map((category) => (
              <Tags key={category.name} name={category.name} categories={categories} setCategories={setCategories} activeCategory={activeCategory} setActiveCategory={setActiveCategory}/>
            ))}
          </div>
        </div>

        <div>
          {displayAddModal && (
            <AddCategory categories={categories} setCategories={setCategories} setDisplayAddModal={setDisplayAddModal}/>
          )}
          <CategoryToAdd/>
        </div>

        <div>
          <Products category={activeCategory} setDisplayAddModal={setDisplayAddModalProducts}/>
          {displayAddModalProducts && (
            <AddProduct category={activeCategory} setDisplayAddModal={setDisplayAddModalProducts} />
          )}
        </div>

        
      </div>
    </>
  );
}

export default RestaurantDetails;
