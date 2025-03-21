import React, { useState } from 'react';
function TripForm() {
    const [startingLocation, setStartingLocation] = useState('');
    const [budget, setBudget] = useState(0);
    const [vibe, setVibe] = useState('');
    const [days, setDays] = useState(1);
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            startingLocation,
            budget,
            vibe,
            days
        };
        try {
            const response = await fetch('http://localhost:8080/api/trips', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const responseData = await response.text();
                console.log('Success:', responseData);
                alert('Trip details sent successfully!');
            } else {
                console.error('Error:', response.status);
                alert('Failed to send trip details.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while sending trip details.');
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="startingLocation">Starting Location:</label>
                <input
                    type="text"
                    id="startingLocation"
                    value={startingLocation}
                    onChange={(e) => setStartingLocation(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="budget">Budget:</label>
                <input
                    type="number"
                    id="budget"
                    value={budget}
                    onChange={(e) => setBudget(parseFloat(e.target.value))}
                />
            </div>
            <div>
                <label htmlFor="vibe">Vibe:</label>
                <input
                    type="text"
                    id="vibe"
                    value={vibe}
                    onChange={(e) => setVibe(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="days">Days:</label>
                <input
                    type="number"
                    id="days"
                    value={days}
                    onChange={(e) => setDays(parseInt(e.target.value))}
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}
export default TripForm;