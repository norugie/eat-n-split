import { useState } from 'react';
import Button from './button';

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

export default SplitBillItem;