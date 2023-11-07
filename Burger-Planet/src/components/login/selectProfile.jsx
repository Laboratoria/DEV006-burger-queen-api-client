// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

function SelectProfile() {
    const [selectedProfile, setSelectedProfile] = useState('');

    const handleProfileChange = (event) => {
        setSelectedProfile(event.target.value);
    };

    return (
        <div className="flex justify-center p-5 mb-8">
            <label
                className="block rounded-xl w-3/5 h-20 overflow-hidden "
                htmlFor="selectHome"
                style={{ width: '600px', height: '120px', }}
            >
                <select
                    className="w-full h-full font-semibold text-xl bg-transparent appearance-none outline-none bg-gradient-to-b from-GreenLight to-DarkGreen"
                    id="selectHome"
                    value={selectedProfile}
                    onChange={handleProfileChange}
                >
                    <option value="">Elige tu rol</option>
                    <option value="chef">Jefe de cocina</option>
                    <option value="admin">Administrador</option>
                    <option value="waiter">Mesero</option>
                </select>
            </label>
        </div>
    );
}

export default SelectProfile;
