
import React, { useState } from "react";
import { MultiSelect } from 'primereact/multiselect';

export default function MultiChoose() {
    const [selectedValue, setSelectedCities] = useState(null);
    const cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];




    return (
        <div className="card flex justify-content-center">
            <MultiSelect value={selectedValue} onChange={(e) => setSelectedCities(e.value)} options={cities} optionLabel="name" 
                filter placeholder="Select Type" maxSelectedLabels={3} className="w-full md:w-20rem" />
        </div>
    );
}
        