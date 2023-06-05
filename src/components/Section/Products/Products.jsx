import "./Products.css";

function Products ({category, setDisplayAddModal}) {

    return (
        <>
            <div className="products">
                <div className="products__any_ctn">
                {category ? (
                    <>
                    <p>Veuillez ajouter un nouveau produit à votre catégorie - {category}</p>
                    <button className="products__btn" onClick={() => setDisplayAddModal(true)}>Ajouter {category}</button>
                    </>
                ) : (
                    <p>Veuillez sélectionner une catégorie</p>
                )}
                </div>
            </div>
        </>
    )
}

export default Products

