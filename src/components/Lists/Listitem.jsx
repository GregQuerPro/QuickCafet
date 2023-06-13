import './Listitem.css'

function Listitem ({item}) {

    return (
        <>
         <div className='list__item' key={item.id}>
            <div>{item.name}</div>
            <div className='list__item_options'>
                <div className='list__item_edit'>Modifier</div>
                <div className='list__item_delete'>Supprimer</div>
            </div>
        </div>
        </>
    )
}

export default Listitem