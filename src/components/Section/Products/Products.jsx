import { useEffect, useState } from "react";
import { supabase } from "../../../external/supabase/supabaseClient";
import Listitem from "../../Lists/Listitem";
import "./Products.css";

function Products ({category, setDisplayAddModal}) {

    const [products, setProducts] = useState([]);

    
    useEffect(() => {
        
        const getProductsByCategory = async () => {
            console.log(category);
            let { data, error } = await supabase
            .from('category')
            .select(`product(*)`)
            .eq('name', category)

            if (data && data.length > 0) {
                // console.log(data[0].product);
                setProducts(data[0].product);
            }
        }

        getProductsByCategory();
    }, [category])

    // console.log(products);

    return (
        <>
        <div className="products">
        <div className="products__any_ctn">
        {category ? (
            products.length > 0 ? (
                products.map(product => (
                    <Listitem item={product} />
                ))
        ) : (
            <>
            <div className="products__any_products">
                <p>Veuillez ajouter un nouveau produit à votre catégorie - {category}</p>
                <button className="products__btn" onClick={() => setDisplayAddModal(true)}>Ajouter {category}</button>
            </div>
            </>
            )
        ) : (
            <div className="products__any_categories">
                <p>Veuillez sélectionner une catégorie</p>
            </div>
        )}
        </div>
        </div>
        </>
    )
}

export default Products

