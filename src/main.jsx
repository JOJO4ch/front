import React from 'react';

const Main = () => {
  return (
    <main style={styles.main}>
      <h2>Welcome to My Website</h2>
      <p>This is the main content area.</p>
    </main>
  );
};

const styles = {
  main: {
    padding: '2rem',
    textAlign: 'center',
  },
};

export default Main;
