import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Papa from 'papaparse'; // CSV parsing library
import "../styles/newresources.css";

const NewResources = () => {
  const { tab } = useParams();
  const [selectedTab, setSelectedTab] = useState(tab || 'food');
  const [foodBanks, setFoodBanks] = useState([]); // State to store food bank data
  const [clothingResources, setClothingResources] = useState([]); // State to store clothing resources
  const [loading, setLoading] = useState(true); // Track loading state
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [housingResources, setHousingResources] = useState([]); // State to store housing resources


  // Fetch and parse the food bank CSV file
  useEffect(() => {
    Papa.parse('/foodbanks.csv', {
      download: true, // assuming the file is served from the public folder
      header: true, // Using the first row as column names
      skipEmptyLines: true, // Skip any empty lines
      dynamicTyping: true, // Automatically type the data (e.g., convert numbers to numbers)
      complete: (result) => {
        if (result && result.data) {
          setFoodBanks(result.data); // Store parsed data in state
        }
      },
      error: (err) => {
        console.error('Error parsing CSV:', err);
      },
    });
  }, []); // Empty dependency array to run only once when component mounts

  // Fetch and parse the clothing CSV file
  useEffect(() => {
    Papa.parse('/clothing.csv', {  // Path to the clothing CSV
      download: true, // assuming the file is served from the public folder
      header: true, // Using the first row as column names
      skipEmptyLines: true, // Skip any empty lines
      dynamicTyping: true, // Automatically type the data (e.g., convert numbers to numbers)
      complete: (result) => {
        if (result && result.data) {
          console.log('Clothing Resources Parsed:', result.data); // Debugging line
          setClothingResources(result.data); // Store parsed data in state
          setLoading(false); // Data is loaded, stop loading
        }
      },
      error: (err) => {
        console.error('Error parsing CSV:', err);
        setLoading(false); // In case of error, stop loading
      },
    });
  }, []); // Empty dependency array to run only once when component mounts

  useEffect(() => {
    Papa.parse('/housing.csv', { // Path to the housing CSV
      download: true, // Assuming the file is served from the public folder
      header: true, // Use the first row as column names
      skipEmptyLines: true, // Skip empty lines
      dynamicTyping: true, // Automatically convert types
      complete: (result) => {
        if (result && result.data) {
          console.log('Housing Resources Parsed:', result.data); // Debugging line
          setHousingResources(result.data); // Store parsed data
        }
      },
      error: (err) => {
        console.error('Error parsing housing CSV:', err);
      },
    });
  }, []);

  useEffect(() => {
    setSelectedTab(tab);
  }, [tab]);

  const handleTabClick = (tab) => {
    setSelectedTab(tab); // Change the tab based on user click
    window.history.pushState(null, '', `/resources/${tab}`);
  };

  // Function to group items into sets of three
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query state
  };

  // Filter food banks based on search query (case-insensitive, checking both City and Name)
  const filteredFoodBanks = foodBanks.filter(foodBank => {
    if (!searchQuery) return true; // Show all food banks if no search query
    const searchTerm = searchQuery.toLowerCase();
    return (
      (foodBank.City && foodBank.City.toLowerCase().includes(searchTerm)) || 
      (foodBank.Name && foodBank.Name.toLowerCase().includes(searchTerm))
    );
  });

  // Filter clothing resources based on search query
  const filteredClothingResources = clothingResources.filter(clothingResource => {
    if (!searchQuery) return true; // Show all clothing resources if no search query
    const searchTerm = searchQuery.toLowerCase();
    return (
      (clothingResource.Name && clothingResource.Name.toLowerCase().includes(searchTerm)) || 
      (clothingResource.County && clothingResource.County.toLowerCase().includes(searchTerm))
    );
  });

  const filteredHousingResources = housingResources.filter(housingResource => {
    if (!searchQuery) return true; // Show all housing resources if no search query
    const searchTerm = searchQuery.toLowerCase();
    return (
      (housingResource.City && housingResource.City.toLowerCase().includes(searchTerm)) || 
      (housingResource.Name && housingResource.Name.toLowerCase().includes(searchTerm)) 
    );
  });

  if (loading) {
    return <div>Loading...</div>; // Show loading message while CSV is being parsed
  }

  return (
    <div className="resource-container">
      <div className="tab-container">
        <div
          className={`tab ${selectedTab === 'food' ? 'active' : ''}`}
          onClick={() => handleTabClick('food')}
        >
          Food
        </div>
        <div
          className={`tab ${selectedTab === 'housing' ? 'active' : ''}`}
          onClick={() => handleTabClick('housing')}
        >
          Shelters
        </div>
        <div
          className={`tab ${selectedTab === 'clothing' ? 'active' : ''}`}
          onClick={() => handleTabClick('clothing')}
        >
          Clothing
        </div>
      </div>

      <div className="content-container">
        {selectedTab === 'food' && (
          <div className="foodbanks">
            <input
              type="text"
              placeholder="Search by city or name..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />

            {/* Display Food Banks */}
            <div className="food-bank-row">
              {chunkArray(filteredFoodBanks, 3).map((foodBankRow, index) => (
                <div key={index} className="food-bank-row">
                  {foodBankRow.map((foodBank, index) => {
                    if (
                      foodBank.Name && 
                      foodBank.City && 
                      foodBank.Contact && 
                      foodBank['Phone Numbers'] && 
                      foodBank.Address && 
                      foodBank['Hours of Operation']
                    ) {
                      return (
                        <div key={index} className="food-bank-block">
                          <div className="food-bank-title">
                            {foodBank.Name} {/* Display Name as bold */}
                          </div>
                          <div className="food-bank-info">
                            <div><strong>City:</strong> {foodBank.City}</div>
                            <div><strong>Contact:</strong> {foodBank.Contact}</div>
                            <div><strong>Phone:</strong> {foodBank['Phone Numbers']}</div>
                            <div><strong>Address:</strong> {foodBank.Address}</div>
                            <div><strong>Hours:</strong> {foodBank['Hours of Operation']}</div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTab === 'clothing' && (
          <div className="clothing">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search by county or name..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input1"
            />

            {/* Display Clothing Resources */}
            <div className="clothing-row">
              {chunkArray(filteredClothingResources, 3).map((clothingRow, index) => (
                <div key={index} className="clothing-row">
                  {clothingRow.map((clothingResource, index) => {
                    console.log('Clothing Resource:', clothingResource); // Debugging line
                    if (
                      clothingResource.Name && 
                      clothingResource.County && 
                      clothingResource.Address && 
                      clothingResource.Phone && 
                      clothingResource.Hours
                    ) {
                      return (
                        <div key={index} className="clothing-block">
                          <div className="clothing-title">
                            {clothingResource.Name} {/* Display Name as bold */}
                          </div>
                          <div className="clothing-info">
                            <div><strong>County:</strong> {clothingResource.County}</div>
                            <div><strong>Address:</strong> {clothingResource.Address}</div>
                            <div><strong>Phone:</strong> {clothingResource.Phone}</div>
                            <div><strong>Hours:</strong> {clothingResource.Hours}</div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              ))}
            </div>
          </div>
        )}

{selectedTab === 'housing' && (
  <div className="housing">
    <input
      type="text"
      placeholder="Search by city or name..."
      value={searchQuery}
      onChange={handleSearchChange}
      className="search-input"
    />

    <div className="housing-row">
      {chunkArray(filteredHousingResources, 3).map((housingRow, index) => (
        <div key={index} className="housing-row">
          {housingRow.map((housingResource, index) => {
            console.log('Housing Resource:', housingResource); // Debugging line
            if (
              housingResource.Name && 
              housingResource.City && 
              housingResource.Contact && 
              housingResource.Phone && 
              housingResource.Address && 
              housingResource.Description
            ) {
              return (
                <div key={index} className="housing-block">
                  <div className="housing-title">
                    {housingResource.Name} {/* Display Name */}
                  </div>
                  <div className="housing-info">
                    <div><strong>City:</strong> {housingResource.City}</div>
                    <div><strong>Contact:</strong> {housingResource.Contact}</div>
                    <div><strong>Phone:</strong> {housingResource.Phone}</div>
                    <div><strong>Website:</strong> <a href={housingResource.Website}>{housingResource.Website}</a></div>
                    <div><strong>Address:</strong> {housingResource.Address}</div>
                    <div><strong>Description:</strong> {housingResource.Description}</div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default NewResources;
