import { useParams } from "react-router-dom";

function CategorieDetails () {
    const { id } = useParams()

    return (
        <>
            <div className="content">
                <h1>Détail de la catégorie {id}</h1>
            </div>
        </>
    )
}

export default CategorieDetails