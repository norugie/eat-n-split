import { useState } from 'react';
import Button from './button';

function AddFriendForm ({onAddFriend}) {
    const [name, setName] = useState('');
    const [image, setImage] = useState('https://i.pravatar.cc/48');

    function handleAddFriend (e) {
        e.preventDefault();
        if(!name || !image) return;

        const id = crypto.randomUUID();

        const newFriend = {
            name: name,
            image: `${image}?=${id}`,
            balance: 0,
            id: id
        };
        
        onAddFriend(newFriend);

        setName('');
        setImage('https://i.pravatar.cc/48');
    }

    return (
        <form className='form-add-friend' onSubmit={handleAddFriend}>
            <label>Friend Name</label>
            <input type='text' value={name} onChange={(e) => setName(e.target.value)} />

            <label>Image URL</label>
            <input type='text' value={image} onChange={(e) => setImage(e.target.value)} />

            <Button>Add</Button>
        </form>
    );
}

export default AddFriendForm;