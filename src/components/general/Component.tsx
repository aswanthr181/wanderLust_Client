import axios from "axios";
import { useEffect, useState } from "react";

function Component() {
    
    const [attractions, setAttractions] = useState([]);
 console.log(attractions);
 
  useEffect(() => {
    const fetchAttractions = async () => {
        try {
            const response = await axios.get('http://localhost:3000/location', {
                params: {
                    location: '12.9716,77.5946', // Optional: Customize based on user input
                    radius: 5000,
                    type: 'tourist_attraction',
                },
            });
            console.log('datatata',response.data);
            
            setAttractions(response.data);
        } catch (error) {
            console.error('Error fetching tourist attractions:', error);
        }
    };

    fetchAttractions();
}, []);
  return (
    <div>Component</div>
  )
}

export default Component