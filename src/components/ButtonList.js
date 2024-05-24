import React from 'react'
import Button from './Button'
const list = ["All", "Gmaing", "News", "Cricket", "Live", "Cooking", "Songs", "Soccer", "Election", "Comedy", "Cars", "Tourist destinations"]
const ButtonList = () => {
    return (
        <div className='flex'>
            {list.map((listName, index) => (
                <Button key={index} name={listName} />
            ))}
        </div>
    )
}

export default ButtonList