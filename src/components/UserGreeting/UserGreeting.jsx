import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import { useParams } from "react-router-dom";
import { getUserMainData } from "../../dataManager/dataManager";
import "./UserGreeting.css";
/**
 * UserGreeting component displays a greeting message for the user.
 * @param {Object} props - The React props object.
 * @param {string} props.userId - The user's ID.
 * @returns {JSX.Element}
 */
function UserGreeting({ userId }) {
  // Initialize state variables for user data and error status
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  // Fetch user data when the component mounts or when userId changes
  useEffect(() => {
    /**
     * Fetches user data and updates the state.
     * @async
     */
    async function fetchData() {
      try {
        // Get user main data from the data manager
        const userData = await getUserMainData(userId);
        // Find the user with the matching userId
        // const userData = data.find((u) => u.id === parseInt(userId, 10));
        // Update the user state with the found user data
        setUser(userData);
      } catch (err) {
        // If there's an error fetching data, set the error state to true
        console.log(err);
        setError(true);
      }
    }
    // Call fetchData to fetch user data
    fetchData();
  }, [userId]);

  // If there's an error, display an error message
  if (error) {
    return <div className="error">Error: Failed to load user data.</div>;
  }
  // If user data is not yet loaded, display a loading message
  if (!user) {
    return <div className="loading">Loading...</div>;
  }
  // Render the greeting message with the user's first name
  return (
    <div className="GreetingContainer">
      <h1 className="hello">
        Bonjour <span className="firstName">{user.userInfos.firstName}</span>
      </h1>
      <h2> Félicitation ! Vous avez explosé vos objectifs hier 👏</h2>
    </div>
  );
}
// Define PropTypes for the component
UserGreeting.propTypes = {
  userId: PropTypes.string.isRequired,
};
export default UserGreeting;