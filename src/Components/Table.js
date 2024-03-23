import React, { useState, useEffect } from 'react';
import collegesData from '../Data/collegesData.json';
import './Table.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';


const Table = () => {
  const [colleges, setColleges] = useState(collegesData);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchText, setSearchText] = useState('');
  const [filteredColleges, setFilteredColleges] = useState([]);
  const [sortOptions] = useState([
    { value: 'collegeName', label: 'College Name' },
    { value: 'rating', label: 'Collegedunia Rating' },
    { value: 'fees', label: 'Fees' },
    { value: 'userReviewRating', label: 'User Review Rating' },
    { value: 'ranking', label: 'Ranking' },
  ]);
  const [selectedSortOption, setSelectedSortOption] = useState('');
  useEffect(() => {
    
    const fetchColleges = async () => {
      try {
        
        const data = collegesData;
        console.log(data)
        setColleges(data);
        setFilteredColleges(data); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching college data:', error);
        setLoading(false);
      }
    };
  
    fetchColleges();
  }, []);

  

  
const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }

   
    const sortedColleges = [...filteredColleges].sort((a, b) => {
      if (column === 'collegeName') {
        return sortOrder === 'asc' ? a.collegeName.localeCompare(b.collegeName) : b.collegeName.localeCompare(a.collegeName);
      } else {
        return sortOrder === 'asc' ? a[column] - b[column] : b[column] - a[column];
      }
    });
    setFilteredColleges(sortedColleges);
  };

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    
    if (searchText.trim() === '') {
      
      setFilteredColleges(colleges);
    } else {
      
      const filtered = colleges.filter(college => college.collegeName.toLowerCase().includes(searchText.toLowerCase()));
      setFilteredColleges(filtered);
    }
  };
  
  const handleSortOptionChange = (e) => {
    setSelectedSortOption(e.target.value);
    handleSort(e.target.value); 
  };

  return (
    <div className='header'>
    <div className="table-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by College Name"
          value={searchText}
          onChange={handleSearch}
        />
      </div>
      <div className="sort-by-dropdown">
        <label>Sort By:</label>
        <select value={selectedSortOption} onChange={handleSortOptionChange}>
          <option value="">Select Option</option>
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      </div>

      
      <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th
                  onClick={() => this.handleSort('ranking')}
                  className="ranking-column"
                >
                  Ranking
                </th>
                <th
                  onClick={() => this.handleSort('collegeName')}
                  className="college-name-column"
                >
                  College Name
                </th>
                <th
                  onClick={() => this.handleSort('rating')}
                  className="college-rating-column"
                >
                  Collegedunia Rating
                </th>
                <th
                  onClick={() => this.handleSort('fees')}
                  className="fees-column"
                >
                  Fees
                </th>
                <th
                  onClick={() => this.handleSort('userReviewRating')}
                  className="user-review-rating-column"
                >
                  User Review Rating
                </th>
</tr>
            </thead>
            <tbody>
            {loading && <tr><td colSpan="5">Loading...</td></tr>}
            {!loading && filteredColleges.map(college => (
              <tr key={college.id}>
                 <td>{college.ranking}</td>
                 <td className="college-name-cell">
      {college.featured && (
        <span className="featured-flag-container" title="Featured">
          <FontAwesomeIcon icon={faFlag} />
         
        </span>
      )}
      <span className="college-name-text">{college.collegeName}</span>
    </td>
                <td>{college.rating}</td>
                <td>{college.fees}</td>
                <td>{college.userReviewRating}</td>
               
                
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default Table;
