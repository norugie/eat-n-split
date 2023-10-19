import { useState } from 'react';

const initialFriends = [
    {
        id: 118836,
        name: 'Clark',
        image: 'https://i.pravatar.cc/48?u=118836',
        balance: -7,
    },
    {
        id: 933372,
        name: 'Sarah',
        image: 'https://i.pravatar.cc/48?u=933372',
        balance: 20,
    },
    {
        id: 499476,
        name: 'Anthony',
        image: 'https://i.pravatar.cc/48?u=499476',
        balance: 0,
    },
];

function App () {
    const [open, setOpen] = useState(false);
    const [friends, setFriends] = useState(initialFriends);
    const [selectedFriend, setSelectedFriend] = useState(null);

    function handleShowAddFriendForm () {
        setOpen((open) => !open);
    }

    function handleAddFriend (friend) {
        setFriends((friends) => [...friends, friend]);
        setOpen(false);
    }

    function handleSelectedFriend (friend) {
        setSelectedFriend((selectedFriend) => (selectedFriend?.id === friend.id ? null : friend));
        setOpen(false);
    }

    function handleSplitBillValue (value)
    {
        setFriends((friends) => friends.map((friend) => friend.id === selectedFriend.id ? {...friend, balance: friend.balance + value} : friend))
        setSelectedFriend(null);
    }

    return (
        <div className='app'>
            <div className='sidebar'>
                <FriendsList friends={friends} onSelection={handleSelectedFriend} selectedFriend={selectedFriend} />
                {open && <AddFriendForm onAddFriend={handleAddFriend} />}
                <Button onClick={handleShowAddFriendForm}>{!open ? 'Add Friend' : 'Close Form'}</Button>
            </div>
            {selectedFriend && <SplitBillItem selectedFriend={selectedFriend} onSplitBill={handleSplitBillValue} />}
        </div>
    );
}

function FriendsList ({friends, onSelection, selectedFriend}) {
    return (
        <ul>
            {friends.map((friend) => <Friend friend={friend} key={friend.id} onSelection={onSelection} selectedFriend={selectedFriend} />)}  
        </ul>  
    );
}

function Friend ({friend, onSelection, selectedFriend}) {
    return (
        <li className={selectedFriend?.id === friend.id ? 'selected' : ''}>
            <img src={friend.image} alt={friend.name} />
            <h3>{friend.name}</h3>

            {
                friend.balance < 0 
                ? <p className='red'>You owe {friend.name} {Math.abs(friend.balance)}.</p>
                : friend.balance > 0
                ? <p className='green'>{friend.name} owes you {Math.abs(friend.balance)}.</p>
                : friend.balance === 0 && <p>You and {friend.name} are even.</p>
            }

            <Button onClick={() => onSelection(friend)}>
                {selectedFriend?.id === friend.id ? 'Close' : 'Select'}
            </Button>
        </li>
    );
}

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

function SplitBillItem ({selectedFriend, onSplitBill}) {
    const [bill, setBill] = useState('');
    const [paidByUser, setPaidByUser] = useState('');
    const paidByFriend = bill ? bill - paidByUser : "";
    const [whoIsPaying, setWhoIsPaying] = useState('user');

    function handleSplitBill (e) {
        e.preventDefault();

        if(!bill || !paidByUser) return;

        onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser);
    }

    return (
        <form className='form-split-bill' onSubmit={handleSplitBill}>
            <h2>Split Bill with {selectedFriend.name}</h2>
            <label>Bill Value</label>
            <input type='text' value={bill} onChange={(e) => setBill(Number(e.target.value))} />

            <label>Your Expense</label>
            <input type='text' value={paidByUser} onChange={(e) => setPaidByUser(Number(e.target.value) > bill ? paidByUser : Number(e.target.value))} />

            <label>{selectedFriend.name}'s Expense</label>
            <input type='text' value={paidByFriend} disabled />

            <label>Who is paying the bill?</label>
            <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
                <option value='user'>You</option>
                <option value='friend'>{selectedFriend.name}</option>
            </select>

            <Button>Split Bill</Button>
        </form>
    );
}

// UI reusable components
function Button ({children, onClick}) {
    return (
        <button className='button' onClick={onClick}>{children}</button>
    );
}

export default App;
