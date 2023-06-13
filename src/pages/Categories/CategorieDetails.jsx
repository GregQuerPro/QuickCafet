import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../external/supabase/supabaseClient";

function CategorieDetails () {
    const { id } = useParams()

    const [categoryDetails, setCategoryDetails] = useState({
        name: ''
    });

    useEffect(() => {
        async function getCategoryDetails (id) {
          let { data, error } = await supabase
            .from('category')
            .select('*')
            .eq('id', id)
            .single();
    
          if (error) {
            console.warn(error)
          } else if (data) {
            setCategoryDetails(data);
          }
              
        }
        getCategoryDetails(id)
      }, [id])


      console.log(categoryDetails);

    return (
        <>
            <div className="content">
                <h1>Détail de la catégorie {categoryDetails.name}</h1>
            </div>
        </>
    )
}

export default CategorieDetails