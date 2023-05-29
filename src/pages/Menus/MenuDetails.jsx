import { useParams } from "react-router-dom";

function MenuDetails () {
    const { id } = useParams();

    return (
        <>
            <div className="content">
                <h1>Détails du menu {id}</h1>
            </div>
        </>
    )
}

export default MenuDetails