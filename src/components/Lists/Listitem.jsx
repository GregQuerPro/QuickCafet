import './Listite.css'

function Listitem () {

    return (
        <>
         <div className='list__item' key={restaurant.id}>{restaurant.name}</div>
        </>
    )
}

export default Listitem