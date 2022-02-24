import classes from './SearchFilter.module.css';


const SearchFilter = () => {
    return (
        <input className={classes.inputSearch} type="text" placeholder='Search'/>
    )
}

export default SearchFilter;