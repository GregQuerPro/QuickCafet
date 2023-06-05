import './Input.css'

function Input({ label, value, onChange }) {
    return (
      <>
        <p>
          <label htmlFor={label} className="input__label">{label}</label><br />
          <input type="text" id={label} name={label} value={value} onChange={onChange} className="input__text"/>
        </p>
      </>
    );
  }
  
  export default Input;