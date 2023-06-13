import './Tags.css'

function Tags ({name, categories, setCategories, activeCategory, setActiveCategory}) {

    const handleDeleteCategory = (e) => {
        const parentElement = e.target.parentNode;
        const content = parentElement.textContent.trim();
        const categoryName = content.slice(0, -1);

        const updatedCategories = categories.filter((category) => category.name !== categoryName.trim());
        // console.log(updatedCategories);
        setCategories(updatedCategories);
    }

    return (
        <>
            <div className={`tag ${activeCategory === name ? 'active' : ''}`} onClick={() => setActiveCategory(name)}>
                <span>{name}</span> 
                <span className='tag__delete' onClick={handleDeleteCategory}>x</span>
            </div>
        </>
    )

}

export default Tags