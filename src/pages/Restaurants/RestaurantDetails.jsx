import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../../external/supabase/supabaseClient';

function RestaurantDetails() {
  const { id } = useParams();
  const [restaurantDetails, setRestaurantDetails] = useState('')
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
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


    getRestaurantDetail(id)
  }, [id])


  const getRestaurantImageUrl = (image) => {
      const url = 'restaurants/' + image
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

  const handleSubmitForm = async (event) => {
    event.preventDefault();
    const formatedDate = date.toISOString();

    try {
      const { data, error } = await supabase
        .from('restaurant')
        .update({
          name: restaurantDetails.name,
          address: restaurantDetails.address,
          image: restaurantDetails.name,
          updated_at: formatedDate,
        })
        .eq('id', restaurantDetails.id);

        getRestaurantImageUrl(imageFile.name)

    } catch (error) {
      console.error(error);
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
          <p>
            <label htmlFor="name">Nom restaurant</label><br />
            <input type="text" id="name" name="name" value={restaurantDetails && restaurantDetails.name} onChange={handleNameChange}/>
          </p>
          <p>
            <label htmlFor="address">Adresse restaurant</label><br />
            <input type="text" id="address" name="address" value={restaurantDetails && restaurantDetails.address} onChange={handleAddressChange}/>
          </p>
          <p>
            <label htmlFor="image">Image</label><br />
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </p>
          <p>
            <button type="submit">Enregistrer</button>
          </p>
        </form>
      </div>
    </>
  );
}

export default RestaurantDetails;
