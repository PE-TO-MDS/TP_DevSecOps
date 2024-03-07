import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GiftListDisplay = () => {
    const [gifts, setGifts] = useState([]);
    const [selectedGift, setSelectedGift] = useState(null);
    const [formData, setFormData] = useState({ name: '', description: '', price: '' });
    const [newGiftData, setNewGiftData] = useState({ name: '', description: '', price: '' });

    useEffect(() => {
        fetchGifts();
    }, []);

    const fetchGifts = async () => {
        try {
            const response = await axios.get('/api/gifts');
            setGifts(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des cadeaux:', error);
        }
    };

    const addGift = async (gift) => {
        try {
            await axios.post('/api/gifts', gift);
            fetchGifts(); // Rafraîchir la liste après ajout
            setNewGiftData({ name: '', description: '', price: '' }); // Réinitialiser le formulaire
        } catch (error) {
            console.error("Erreur lors de l'ajout du cadeau:", error);
        }
    };

    const updateGift = async (id, gift) => {
        try {
            await axios.put(`/api/gifts/${id}`, gift);
            fetchGifts(); // Rafraîchir la liste après mise à jour
            setSelectedGift(null); // Réinitialiser la sélection après la mise à jour
        } catch (error) {
            console.error('Erreur lors de la mise à jour du cadeau:', error);
        }
    };

    const deleteGift = async (id) => {
        try {
            await axios.delete(`/api/gifts/${id}`);
            fetchGifts(); // Rafraîchir la liste après suppression
        } catch (error) {
            console.error('Erreur lors de la suppression du cadeau:', error);
        }
    };

    const handleEditClick = (gift) => {
        setSelectedGift(gift.id);
        setFormData({ name: gift.name, description: gift.description, price: gift.price });
    };

    const handleFormChange = (e, isEdit = true) => {
        const { name, value } = e.target;
        if (isEdit) {
            setFormData(prevState => ({ ...prevState, [name]: value }));
        } else {
            setNewGiftData(prevState => ({ ...prevState, [name]: value }));
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        updateGift(selectedGift, formData);
    };

    const handleAddGift = (e) => {
        e.preventDefault();
        addGift(newGiftData);
    };

    return (
        <div>
            <h1>Liste des cadeaux</h1>
            <form onSubmit={handleAddGift}>
                <input
                    type="text"
                    name="name"
                    value={newGiftData.name}
                    onChange={(e) => handleFormChange(e, false)}
                    placeholder="Nom"
                />
                <input
                    type="text"
                    name="description"
                    value={newGiftData.description}
                    onChange={(e) => handleFormChange(e, false)}
                    placeholder="Description"
                />
                <input
                    type="number"
                    name="price"
                    value={newGiftData.price}
                    onChange={(e) => handleFormChange(e, false)}
                    placeholder="Prix"
                />
                <button type="submit">Ajouter un cadeau</button>
            </form>
            <ul>
                {gifts.map(gift => (
                    <li key={gift.id}>
                        {gift.name} - {gift.price}€
                        <button onClick={() => deleteGift(gift.id)}>Supprimer</button>
                        <button onClick={() => handleEditClick(gift)}>Modifier</button>
                    </li>
                ))}
            </ul>
            {selectedGift && (
                <form onSubmit={handleUpdate}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        placeholder="Nom"
                    />
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleFormChange}
                        placeholder="Description"
                    />
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleFormChange}
                        placeholder="Prix"
                    />
                    <button type="submit">Mettre à jour</button>
                </form>
            )}
        </div>
    );
};

export default GiftListDisplay;
