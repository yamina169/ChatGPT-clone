import './List.css'
import React from 'react';
const List = ({label, options, defaultOption})  => {
  return (
    <div>
 <select className="form-select" aria-label="Default select example">
        <option selected>{defaultOption}</option>
        {options.map(option => (
          <option value={option.value}>{option.text}</option>
        ))}
      </select>
    </div>
  )
}

export default List

