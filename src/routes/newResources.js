import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Papa from 'papaparse';
import "../styles/newresources.css";

const NewResources = () => {
  const { tab } = useParams();
  const [selectedTab, setSelectedTab] = useState(tab || 'food');
  const [foodBanks, setFoodBanks] = useState([]);
  const [clothingResources, setClothingResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [housingResources, setHousingResources] = useState([]);

  /**
   * Fetches and parses the food bank CSV data
   * @param {Object} result - The parsed CSV result
   */
  useEffect(() => {
    Papa.parse('/foodbanks.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (result) => {
        if (result && result.data) {
          setFoodBanks(result.data);
        }
      },
      error: (err) => {
        console.error('Error parsing CSV:', err);
      },
    });
  }, []);

  /**
   * Fetches and parses the clothing resources CSV data
   * @param {Object} result - The parsed CSV result
   */
  useEffect(() => {
    Papa.parse('/clothing.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (result) => {
        if (result && result.data) {
          setClothingResources(result.data);
          setLoading(false);
        }
      },
      error: (err) => {
        console.error('Error parsing CSV:', err);
        setLoading(false);
      },
    });
  }, []);

  /**
   * Fetches and parses the housing resources CSV data
   * @param {Object} result - The parsed CSV result
   */
  useEffect(() => {
    Papa.parse('/housing.csv', {
      download: true,
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (result) => {
        if (result && result.data) {
          setHousingResources(result.data);
        }
      },
      error: (err) => {
        console.error('Error parsing housing CSV:', err);
      },
    });
  }, []);

  /**
   * Updates the selected tab state when the URL param changes
   * @param {string} tab - The tab to select
   */
  useEffect(() => {
    setSelectedTab(tab);
  }, [tab]);

  /**
   * Handles the tab click event and updates the selected tab
   * @param {string} tab - The selected tab
   */
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    window.history.pushState(null, '', `/resources/${tab}`);
  };

  /**
   * Chunks an array into smaller arrays of a specific size
   * @param {Array} array - The array to chunk
   * @param {number} size - The size of each chunk
   * @returns {Array} - An array of chunked arrays
   */
  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  /**
   * Handles the search input change and updates the search query state
   * @param {Object} e - The event object from the search input
   */
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  /**
   * Filters food banks based on the search query
   * @param {Array} foodBanks - The list of food banks
   * @param {string} searchQuery - The search query entered by the user
   * @returns {Array} - The filtered list of food banks
   */
  const filteredFoodBanks = foodBanks.filter(foodBank => {
    if (!searchQuery) return true;
    const searchTerm = searchQuery.toLowerCase();
    return (
      (foodBank.City && foodBank.City.toLowerCase().includes(searchTerm)) ||
      (foodBank.Name && foodBank.Name.toLowerCase().includes(searchTerm))
    );
  });

  /**
   * Filters clothing resources based on the search query
   * @param {Array} clothingResources - The list of clothing resources
   * @param {string} searchQuery - The search query entered by the user
   * @returns {Array} - The filtered list of clothing resources
   */
  const filteredClothingResources = clothingResources.filter(clothingResource => {
    if (!searchQuery) return true;
    const searchTerm = searchQuery.toLowerCase();
    return (
      (clothingResource.Name && clothingResource.Name.toLowerCase().includes(searchTerm)) ||
      (clothingResource.County && clothingResource.County.toLowerCase().includes(searchTerm))
    );
  });

  /**
   * Filters housing resources based on the search query
   * @param {Array} housingResources - The list of housing resources
   * @param {string} searchQuery - The search query entered by the user
   * @returns {Array} - The filtered list of housing resources
   */
  const filteredHousingResources = housingResources.filter(housingResource => {
    if (!searchQuery) return true;
    const searchTerm = searchQuery.toLowerCase();
    return (
      (housingResource.City && housingResource.City.toLowerCase().includes(searchTerm)) ||
      (housingResource.Name && housingResource.Name.toLowerCase().includes(searchTerm))
    );
  });

  if (loading) {
    return <div>Loading...</div>;
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
                            {foodBank.Name}
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
            <input
              type="text"
              placeholder="Search by county or name..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input1"
            />
            <div className="clothing-row">
              {chunkArray(filteredClothingResources, 3).map((clothingRow, index) => (
                <div key={index} className="clothing-row">
                  {clothingRow.map((clothingResource, index) => {
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
                            {clothingResource.Name}
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
                    if (
                      housingResource.Name && 
                      housingResource.City && 
                      housingResource.Address && 
                      housingResource.Phone
                    ) {
                      return (
                        <div key={index} className="housing-block">
                          <div className="housing-title">
                            {housingResource.Name}
                          </div>
                          <div className="housing-info">
                            <div><strong>City:</strong> {housingResource.City}</div>
                            <div><strong>Address:</strong> {housingResource.Address}</div>
                            <div><strong>Phone:</strong> {housingResource.Phone}</div>
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
