import { useState } from 'react';
import Button from './components/button';
import FriendsList from './components/friendslist';
import AddFriendForm from './components/addfriendform';
import SplitBillItem from './components/splitbillform';


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

export default App;
